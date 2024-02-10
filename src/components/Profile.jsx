import PromptCard from "./PromptCard"

const Profile = ({ name, desc, data,setPosts }) => {

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete")

    if(hasConfirmed) {
        try {
            await fetch(`/api/prompt/${post._id.toString()}`,{
                method: 'DELETE',
            })

            const filteredPosts = data.filter((p) => p._id !== post._id);

            setPosts(filteredPosts);
        } catch (error) {
            console.log(error);
        }
    }
  }
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name} Profile
        </span>
      </h1>
      <p className="desc text-left">
        {desc}
      </p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleDelete={() => handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile