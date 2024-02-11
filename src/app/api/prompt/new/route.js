import { connectDB } from '@utils/database';
import Prompt from '@models/prompt';
import User from '@models/user';

export const POST = async (req, res) => {
    const { userId, prompt, tag} = await req.json();

    try {
        await connectDB();

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })
        
        const creator = await User.findById(userId);
        
        await creator.prompts.push(newPrompt._id)

        await creator.save();
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{ status: 201});
    } catch (error) {
        console.log(error)
        return new Response("Failed to create a new prompt",{ status: 500})
    }
}