import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, description, zodiac } = await request.json();

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Acesso não autorizado" },
        { status: 401 }
      );
    }

    if (!title || !description || !zodiac) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ideaxchange");

    const ideaInsertResult = await db.collection("ideas").insertOne({
      title,
      description,
      zodiac,
      userId: session.user.id,
      createdAt: new Date(),
    });
    console.log("Ideia enviada com sucesso:", ideaInsertResult);
    return NextResponse.json(
      { success: true, userId: ideaInsertResult.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no envio de idea:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("ideaxchange");
    
    const { searchParams } = new URL(request.url);
    const zodiac = searchParams.get('zodiac');

    const filter: { zodiac?: string } = {};
    if (zodiac) filter.zodiac = zodiac;

    const ideas = await db.collection("ideas")
      .find(filter)
      .toArray();

    const sanitizedIdeas = ideas.map(idea => ({
      ...idea,
      _id: idea._id.toString(),
      userId: idea.userId?.toString()
    }));

    return NextResponse.json(sanitizedIdeas, { status: 200 });

  } catch (error) {
    console.error("Error fetching ideas:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
