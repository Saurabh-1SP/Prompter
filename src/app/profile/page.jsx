'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

import Profile from '@components/Profile';

const Myprofile = () => {

    const [posts, setPosts] = useState([]);
    const { data : session } = useSession();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`api/users/${session?.user.id}/posts`);
            const data = await response.json();
    
            setPosts(data);
        }

        if(session?.user.id) fetchPosts();
    },[]);

  return (
    <Profile
        name="My"
        desc={"Welcome to your personalized profile page"}
        data={posts}
        setPosts={setPosts}
    />
  )
}

export default Myprofile