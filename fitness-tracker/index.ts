import { PrismaClient } from '@prisma/client';
import { formatDate } from './src/shared/utils/date/formatDate';
import { capitalize } from './src/shared/utils/string/capitalize';
import { apiClient } from './src/shared/utils/api/apiClient';
import { errorCodes } from './src/shared/utils/constants/errorCodes';
import { httpStatusCodes } from './src/shared/utils/constants/httpStatusCodes';
import { User, Goal, Post } from './src/shared/utils/types';

const prisma = new PrismaClient();

async function main() {
  try {
    const user: User = await apiClient.get('/users/1');
    console.log(`User: ${user.name}`);

    const newGoal: Goal = {
      userId: user.id,
      title: 'Lose 10 pounds',
      target: 10,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
    const createdGoal: Goal = await apiClient.post('/goals', newGoal);
    console.log(`Created Goal: ${createdGoal.title}`);

    const posts: Post[] = await apiClient.get('/posts');
    posts.forEach((post) => {
      console.log(`Post: ${post.content}`);
    });

    const updatedUser: User = {
      id: user.id,
      name: 'Updated User Name',
    };
    await apiClient.put('/users/1', updatedUser);
    console.log('Updated user profile.');

  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);

      if (error.message === errorCodes.USER_NOT_FOUND) {
        console.log('User not found!');
      } else if (error.message === errorCodes.GOAL_CREATION_FAILED) {
        console.log('Failed to create goal!');
      } else if (error.response?.status === httpStatusCodes.BAD_REQUEST) {
        console.log('Invalid request!');
      } else {
        console.log('An unexpected error occurred.');
      }
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
});