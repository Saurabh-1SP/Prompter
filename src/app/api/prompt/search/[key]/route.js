import { connectDB } from '@utils/database';
import Prompt from '@models/prompt';
import User from '@models/user';

export const GET = async (request, {params}) => {
    try {
        await connectDB();

        const field = ['prompt','tag'];

        const post = await Prompt.find({
            $or: field.map(field => ({ [field]: { $regex: params.key, $options: 'i' } }))
        }).populate('creator');

        return new Response(JSON.stringify(post),{status: 200})
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong",{status: 500})
    }
}