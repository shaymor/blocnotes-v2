import Image from 'next/image';
import * as React from 'react';

function Post({ postDetails }) {
  return (
    <a className="p-4 md:w-1/3" href={postDetails.post_link}>
      <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden hover:bg-gray-200">
        <div className="w-full">
          <div className="w-full flex p-2">
            <div className="p-2 ">
              <Image
                src={postDetails.post_author.student_pfp}
                alt="author"
                className="rounded-full overflow-hidden"
                height={40}
                width={40}
              />
            </div>
            <div className="pl-2 pt-2 ">
              <p className="font-bold">
                {postDetails.post_author.student_name}
              </p>
              <p className="text-xs">{postDetails.post_publish}</p>
            </div>
          </div>
        </div>

        {/* Add this back in to give each post card a cover image (possibly for a preview )
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={postDetails.coverImage}
          />
        */}
        <div className="px-4 pb-4">
          <h1 className="title-font text-lg font-medium text-gray-900">
            {postDetails.post_name}
          </h1>
        </div>
      </div>
    </a>
  );
}

export default function PostBoard({ posts }) {
  if (posts.length > 0) {
    return (
      <section className="text-gray-600 body-font">
        <div className="px-5 py-5 mx-auto">
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <Post key={post.post_id} postDetails={post} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="text-gray-600 body-font">
      <div className="px-5 py-5 mx-auto">
        <div className="flex flex-wrap">
          <h1 className="text-3xl font-bold text-gray-900">No posts yet</h1>
        </div>
      </div>
    </section>
  );
}
