import { connectDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET
export const GET = async (request, { params }) => {
    try {
        await connectDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response('Prompt not found', { status: 404});

        return new Response(JSON.stringify(prompt),{ status: 200})
    } catch (error) {
        return new Response(JSON.stringify(error),{ status:500 })
    }
}

// Patch 
export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json();

    try {
        await connectDB();

        const exisitingPrompt = await Prompt.findById(params.id);

        if(!exisitingPrompt) return new Response("Prompt not found", { status: 404});

        exisitingPrompt.prompt = prompt;
        exisitingPrompt.tag = tag;

        await exisitingPrompt.save();

        return new Response(JSON.stringify(exisitingPrompt), { status: 200});
    } catch (error) {
        return new Response("Failed to update Prompt", { status: 500});
    }
}

//Delete
export const DELETE = async (request, {params}) => {
    try {
        await connectDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted", { status: 200});
    } catch (error) {
        return new Response("Failed to delete Prompt", { status: 500});        
    }
}