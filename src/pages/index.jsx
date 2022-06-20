import { getSession, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import * as React from 'react';

import Page from '../components/page/Page';
import Schedule from '../components/schedule/Schedule';
import prisma from '../lib/prisma';

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const { user } = getSession(req, res);

    const students = await prisma.student.findMany({
      where: { student_name: user.name },
    });

    if (students.length > 1 || students.length === 0) {
      return {
        props: {
          schedule: null,
        },
      };
    }

    const student = students[0];
    if (student.student_email === null || student.student_pfp === null) {
      await prisma.student.update({
        where: { student_id: student.student_id },
        data: { student_email: user.email, student_pfp: user.picture },
      });
    }

    const schedule = (
      await Promise.all(
        student.student_classes.map(async (classId) => {
          const classDetails = await prisma.class.findMany({
            where: { schoology_course_id: classId },
          });
          return classDetails.length === 0 ? null : classDetails[0];
        })
      )
    ).filter((classDetails) => classDetails !== null);

    schedule.sort((a, b) => a.class_period - b.class_period);

    return { props: { schedule } };
  },
});

export default function Home({ schedule }) {
  const { error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (schedule != null) {
    return (
      <Page>
        <main>
          <section className="bg-white">
            <Schedule schedule={schedule} />
          </section>
        </main>
      </Page>
    );
  }
  if (schedule === 'err') {
    return (
      <Page>
        <main>
          <section className="bg-white">
            <div className="flex flex-col items-center justify-center text-center min-h-[90vh]">
              <h1>Error</h1>
            </div>
          </section>
        </main>
      </Page>
    );
  }
  return (
    <Page>
      <main>
        <section className="bg-white">
          <div className="flex flex-col items-center justify-center text-center min-h-[90vh]">
            <h1 className="my-4">You are not signed in.</h1>
            <Link href="/api/auth/login" passHref>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="bg-primary-100 text-black px-6 py-2 rounded-md text-base font-medium border border-primary-300 hover:bg-primary-300">
                Sign in
              </a>
            </Link>
          </div>
        </section>
      </main>
    </Page>
  );
}
