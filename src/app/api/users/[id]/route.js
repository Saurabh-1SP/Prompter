import { connectDB } from '@utils/database';
import User from '@models/user';

export const GET = async (request,{ params }) => {
    try {
        await connectDB();

        const prompts = await User.findById(params.id).populate('prompts');

        return new Response(JSON.stringify(prompts),{ status: 200})
    } catch (error) {
        return new Response(JSON.stringify(error),{ status:500 })
    }
}