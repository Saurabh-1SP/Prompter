import { connectDB } from '@utils/database';
import Prompt from '@models/prompt';
import User from '@models/user';

export const GET = async (request, {params}) => {
    try {
        await connectDB();

        const user = await User.find({username: params.key});

        if(user) {
            const post = await Prompt.find({creator: user[0]._id}).populate('creator');

            return new Response(JSON.stringify(post),{status: 200})
        }
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