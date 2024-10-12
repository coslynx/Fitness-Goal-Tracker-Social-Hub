import { apiClient } from '@shared/utils/api/apiClient';
import { errorCodes } from '@shared/utils/constants/errorCodes';
import { httpStatusCodes } from '@shared/utils/constants/httpStatusCodes';
import { Goal } from '@shared/utils/types/goal';

// Define the interface for the Goal service
interface GoalService {
  createGoal: (goal: Goal) => Promise<Goal>;
  getGoals: (userId?: number) => Promise<Goal[]>;
  updateGoal: (goalId: number, goal: Partial<Goal>) => Promise<Goal>;
  deleteGoal: (goalId: number) => Promise<void>;
}

// Implement the Goal service
const goalService: GoalService = {
  async createGoal(goal) {
    try {
      const response = await apiClient.post('/goals', goal);
      if (response.status === httpStatusCodes.CREATED) {
        return response.data;
      } else {
        throw new Error(errorCodes.GOAL_CREATION_FAILED);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === errorCodes.GOAL_CREATION_FAILED) {
          throw new Error(errorCodes.GOAL_CREATION_FAILED);
        } else {
          throw new Error(errorCodes.UNEXPECTED_ERROR);
        }
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
  async getGoals(userId) {
    try {
      const response = await apiClient.get<Goal[]>(`/goals${userId ? `?userId=${userId}` : ''}`);
      if (response.status === httpStatusCodes.OK) {
        return response.data;
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
  async updateGoal(goalId, goal) {
    try {
      const response = await apiClient.put(`/goals/${goalId}`, goal);
      if (response.status === httpStatusCodes.OK) {
        return response.data;
      } else {
        throw new Error(errorCodes.GOAL_UPDATE_FAILED);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === errorCodes.GOAL_UPDATE_FAILED) {
          throw new Error(errorCodes.GOAL_UPDATE_FAILED);
        } else {
          throw new Error(errorCodes.UNEXPECTED_ERROR);
        }
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
  async deleteGoal(goalId) {
    try {
      const response = await apiClient.delete(`/goals/${goalId}`);
      if (response.status === httpStatusCodes.NO_CONTENT) {
        return;
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
};

// Export the Goal service
export { goalService };