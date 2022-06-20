/* eslint-disable camelcase */
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

import prisma from '../../lib/prisma';

export default withApiAuthRequired(async (req, res) => {
  const { user } = getSession(req, res);
  const { post_name, post_link, post_image, class_id } = req.body;

  const students = await prisma.student.findMany({
    where: { student_name: user.name },
  });

  const post = await prisma.post.create({
    data: {
      post_name,
      post_link,
      post_image,
      post_author: {
        connect: {
          student_id: students[0].student_id,
        },
      },
      Class: {
        connect: {
          class_id,
        },
      },
    },
  });

  res.json({ post });
});
