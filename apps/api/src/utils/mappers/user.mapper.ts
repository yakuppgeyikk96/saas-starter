// User mapper - Type transformations (Entity → DTO → Response)
import { UserEntity } from '../../types/entities/user.entity';
import { UserDto } from '../../types/dtos/auth.dto';

/**
 * Transform UserEntity to UserDto (exclude password)
 */
export const toUserDto = (user: UserEntity): UserDto => {
  const { password, ...userDto } = user;
  return userDto;
};

