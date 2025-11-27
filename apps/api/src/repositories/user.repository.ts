import { prisma } from "../lib/prisma";
import { UserEntity } from "../types/entities/user.entity";
import { CreateUserData } from "../types/repositories/user.repository.types";

/**
 * Find user by email
 */
export const findUserByEmail = async (
  email: string
): Promise<UserEntity | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Check if user exists by email
 */
export const userExists = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return !!user;
};

/**
 * Create a new user
 */
export const createUser = async (data: CreateUserData): Promise<UserEntity> => {
  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: data.password,
    },
  });
};
