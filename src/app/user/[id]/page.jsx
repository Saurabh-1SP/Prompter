'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation";

import Profile from '@components/Profile';

const User = () => {

    const [data, setData] = useState({});
    const { data : session } = useSession();
    const params = useParams();

    useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params.id}`);
        const data = await response.json();

        setData(data);
      }

      if(session?.user.id) fetchPosts();
    },[]);

  return (
    <Profile
        name={session?.user.id === params.id ? 'My' : data.username}
        desc={"Welcome to your personalized profile page"}
        data={data}
        setPosts={setData}
    />
  )
}

export default User