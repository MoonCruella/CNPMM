import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

const userModel = new UserModel();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      // Kiểm tra email đã tồn tại
      const existingUser = await userModel.findByEmail(req.body.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const user = await userModel.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      // Nếu có search parameters, redirect to search
      if (req.query.search || req.query.email || req.query.username) {
        return this.searchUsers(req, res);
      }

      if (req.query.page || req.query.limit) {
        const result = await userModel.findAllWithPagination(page, limit);
        res.json(result);
      } else {
        const users = await userModel.findAll();
        console.log("NguyetCute: users", users);
        res.json(users);
      }
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      res.status(500).json({ message: "Error fetching users" });
    }
  }

  // Tìm kiếm và lọc users
  async searchUsers(req: Request, res: Response) {
    try {
      const {
        q = "",
        page = 1,
        limit = 5,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = req.query;

      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      // Tạo sort object
      const sortObj: { [key: string]: 1 | -1 } = {};
      sortObj[sortBy as string] = sortOrder === "desc" ? -1 : 1;

      // Gọi hàm fuzzy search trong userModel
      const result = await userModel.searchUsers(
        q as string,
        sortObj,
        skip,
        limitNum
      );

      res.status(200).json({
        success: true,
        message: `Search results for "${q}"`,
        data: result.users,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(result.total / limitNum),
          totalUsers: result.total,
          usersPerPage: limitNum,
          hasNextPage: pageNum < Math.ceil(result.total / limitNum),
          hasPrevPage: pageNum > 1,
        },
        searchTerm: q,
      });
    } catch (error) {
      console.error("Search users error:", error);
      res.status(500).json({
        success: false,
        message: "Error searching users",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Controller
  async searchUsersWithFuzzy(req: Request, res: Response) {
    try {
      const { q = "", page = "1", limit = "5" } = req.query;

      const pageNum = parseInt(page as string, 10);
      const limitNum = parseInt(limit as string, 10);
      const skip = (pageNum - 1) * limitNum;

      // Gọi hàm fuzzy search trong userModel
      const result = await userModel.searchUsersWithFuzzy(
        q as string,
        skip,
        limitNum
      );

      res.json({
        success: true,
        message: `Search results for "${q}"`,
        data: result.users,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(result.total / limitNum),
          totalUsers: result.total,
          usersPerPage: limitNum,
          hasNextPage: pageNum < Math.ceil(result.total / limitNum),
          hasPrevPage: pageNum > 1,
        },
        searchTerm: q,
      });
    } catch (error) {
      console.error("Fuzzy search error:", error);
      res.status(500).json({
        success: false,
        message: "Error searching users",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Get user suggestions for autocomplete
  async getUserSuggestions(req: Request, res: Response) {
    try {
      const { field, q, limit = 5 } = req.query;

      if (!field || !q) {
        return res.status(400).json({
          success: false,
          message: "Field and query parameters are required",
        });
      }

      const searchQuery: any = {};
      searchQuery[field as string] = { $regex: q as string, $options: "i" };

      // Sử dụng userModel.searchUsers và lấy suggestions từ kết quả
      const result = await userModel.searchUsers(
        searchQuery,
        {},
        0,
        parseInt(limit as string)
      );

      const suggestions = result.users
        .map((user) => user[field as keyof typeof user])
        .filter(Boolean);
      const uniqueSuggestions = [...new Set(suggestions)];

      res.status(200).json({
        success: true,
        suggestions: uniqueSuggestions,
      });
    } catch (error) {
      console.error("Get suggestions error:", error);
      res.status(500).json({
        success: false,
        message: "Error getting suggestions",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Filter users by multiple criteria với preset filters
  async filterUsers(req: Request, res: Response) {
    try {
      const { filterType } = req.params;
      const { page = "1", limit = "5" } = req.query;

      let filters = {};

      // Preset filters
      switch (filterType) {
        case "recent":
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          filters = { createdAt: { $gte: oneWeekAgo } };
          break;
        case "today":
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          filters = {
            createdAt: {
              $gte: today,
              $lt: tomorrow,
            },
          };
          break;
        case "thisweek":
          const weekStart = new Date();
          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
          weekStart.setHours(0, 0, 0, 0);
          filters = { createdAt: { $gte: weekStart } };
          break;
        case "thismonth":
          const monthStart = new Date();
          monthStart.setDate(1);
          monthStart.setHours(0, 0, 0, 0);
          filters = { createdAt: { $gte: monthStart } };
          break;
        default:
          return res.status(400).json({
            message:
              "Invalid filter type. Available: recent, today, thisweek, thismonth",
          });
      }

      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const result = await userModel.searchUsers(
        filters,
        { createdAt: -1 }, // Sort by newest first
        skip,
        limitNum
      );

      res.json({
        message: `${filterType} users fetched successfully`,
        data: result.users,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(result.total / limitNum),
          totalUsers: result.total,
          usersPerPage: limitNum,
        },
        filterType,
      });
    } catch (error) {
      console.error("Error filtering users:", error);
      res.status(500).json({ message: "Error filtering users" });
    }
  }

  // Get user statistics
  async getUserStats(req: Request, res: Response) {
    try {
      const stats = await userModel.getUserStats();
      res.json({
        message: "User statistics fetched successfully",
        data: stats,
      });
    } catch (error) {
      console.error("Error getting user stats:", error);
      res.status(500).json({ message: "Error getting user stats" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await userModel.findById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const success = await userModel.update(req.params.id, req.body);
      if (success) {
        res.json({ message: "User updated successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const success = await userModel.delete(req.params.id);
      if (success) {
        res.json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  }

  // Admin only: Toggle user status (activate/deactivate)
  async toggleUserStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      const currentUserId = req.user?.userId;

      // Không cho phép admin tự deactivate chính mình
      if (currentUserId === id && !isActive) {
        return res.status(400).json({
          message: "Cannot deactivate your own account",
        });
      }

      const success = await userModel.update(id, { isActive });
      if (!success) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = await userModel.findById(id);
      res.json({
        message: `User ${isActive ? "activated" : "deactivated"} successfully`,
        user,
      });
    } catch (error) {
      console.error("Toggle user status error:", error);
      res.status(500).json({ message: "Error updating user status" });
    }
  }

  // Admin only: Update all user information
  async updateUserByAdmin(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const currentUserId = req.user?.userId;

      // Không cho phép admin cập nhật thông tin của chính mình qua API này
      if (currentUserId === id) {
        return res.status(400).json({
          message: "Cannot update your own account through this endpoint",
        });
      }

      const success = await userModel.update(id, req.body);
      if (!success) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const updatedUser = await userModel.findById(id);
      res.json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Update user by admin error:", error);
      res.status(500).json({ message: "Error updating user" });
    }
  }

  // Admin only: Change user role
  async changeUserRole(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const currentUserId = req.user?.userId;

      if (!["user", "admin"].includes(role)) {
        return res.status(400).json({
          message: "Invalid role. Must be user or admin",
        });
      }

      // Không cho phép admin thay đổi role của chính mình
      if (currentUserId === id) {
        return res.status(400).json({
          message: "Cannot change your own role",
        });
      }

      const success = await userModel.update(id, { role });
      if (!success) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = await userModel.findById(id);
      res.json({
        message: "User role updated successfully",
        user,
      });
    } catch (error) {
      console.error("Change user role error:", error);
      res.status(500).json({ message: "Error updating user role" });
    }
  }

  // Admin only: Get all users with role and status filters
  async getAdminUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const { role, isActive } = req.query;

      // Build filters
      const filters: any = {};
      if (role) filters.role = role;
      if (isActive !== undefined) filters.isActive = isActive === "true";

      const skip = (page - 1) * limit;
      const result = await userModel.searchUsers(
        filters,
        { createdAt: -1 },
        skip,
        limit
      );

      res.json({
        message: "Users fetched successfully",
        data: result.users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(result.total / limit),
          totalUsers: result.total,
          usersPerPage: limit,
          hasNextPage: page < Math.ceil(result.total / limit),
          hasPrevPage: page > 1,
        },
        filters,
      });
    } catch (error) {
      console.error("Error in getAdminUsers:", error);
      res.status(500).json({ message: "Error fetching users" });
    }
  }
}
