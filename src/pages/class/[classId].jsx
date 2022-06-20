import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import * as React from 'react';

import PostBoard from '../../components/class/PostBoard';
import Roster from '../../components/class/Roster';
import Page from '../../components/page/Page';
import UploadModal from '../../components/upload/UploadModal';
import prisma from '../../lib/prisma';

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ query }) => {
    let classDetails = await prisma.class.findUnique({
      where: {
        class_id: parseInt(query.classId, 10),
      },
      include: {
        class_posts: {
          include: {
            post_author: true,
          },
        },
      },
    });

    const posts = [];

    classDetails.class_posts.forEach((post) => {
      posts.push({
        ...post,
        post_publish: post.post_publish.toLocaleString().split(',')[0],
      });
    });

    classDetails = { ...classDetails, class_posts: posts };

    const classStudents = await prisma.student.findMany({
      where: {
        student_classes: {
          has: classDetails.schoology_course_id,
        },
        student_year: {
          lt: 99,
        },
      },
    });

    classStudents.sort((a, b) =>
      a.student_name.split(' ')[1].localeCompare(b.student_name.split(' ')[1])
    );

    return { props: { classDetails, classStudents, posts } };
  },
});

export default function Class({ classDetails, classStudents, posts }) {
  const [openRoster, setOpenRoster] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleRosterClick = () => {
    setOpenRoster(!openRoster);
  };

  const handleModalClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <Page>
      <UploadModal open={openModal} setOpen={setOpenModal} />
      <Roster
        open={openRoster}
        setOpen={setOpenRoster}
        students={classStudents}
      />
      <header className="bg-white shadow">
        <div className="max-w-7xl flex flex-row items-center mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900">
              {classDetails.class_name}
            </h1>
            <h2 className="text-sm font-medium text-gray-900 opacity-50 uppercase">
              {classDetails.class_teacher != null
                ? classDetails.class_teacher
                : 'Teacher not found'}{' '}
              | Period {classDetails.class_period}
            </h2>
            <div className="block md:hidden">
              <button
                type="button"
                className="bg-primary-100 mt-4 text-black px-6 py-2 rounded-md ml-4 text-base font-medium border border-primary-300 hover:bg-primary-300"
                onClick={handleModalClick}
              >
                Upload notes
              </button>
              <button
                type="button"
                className="bg-primary-100 mt-4 text-black px-6 py-2 rounded-md ml-4 text-base font-medium border border-primary-300 hover:bg-primary-300"
                onClick={handleRosterClick}
              >
                Roster
              </button>
            </div>
          </div>
          <span className="flex-grow" />
          <div className="hidden md:block">
            <button
              type="button"
              className="bg-primary-100 text-black px-6 py-2 rounded-md ml-4 text-base font-medium border border-primary-300 hover:bg-primary-300"
              onClick={handleModalClick}
            >
              Upload notes
            </button>
            <button
              type="button"
              className="bg-primary-100 text-black px-6 py-2 rounded-md ml-4 text-base font-medium border border-primary-300 hover:bg-primary-300"
              onClick={handleRosterClick}
            >
              Roster
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <PostBoard posts={posts} />
        </div>
      </main>
    </Page>
  );
}
