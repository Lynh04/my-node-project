import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

// Cấu hình Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API Documentation",
      version: "1.0.0",
      description:
        "API quản lý người dùng - Lấy, tạo, cập nhật, xóa người dùng",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: process.env.URL_API,
        description: "Development Server",
      },
      {
        url: process.env.URL_API,
        description: "Local Server",
      },
    ],
    components: {
      schemas: {
        // Schema định nghĩa cấu trúc User
        User: {
          type: "object",
          required: ["name", "email"],
          properties: {
            _id: {
              type: "string",
              description: "ID duy nhất của người dùng",
              example: "507f1f77bcf86cd799439011",
            },
            name: {
              type: "string",
              description: "Tên người dùng",
              example: "Nguyễn Văn A",
            },
            email: {
              type: "string",
              description: "Email của người dùng",
              example: "user@example.com",
            },
            phone: {
              type: "string",
              description: "Số điện thoại",
              example: "0912345678",
            },
            age: {
              type: "number",
              description: "Tuổi của người dùng",
              example: 25,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Ngày tạo",
              example: "2024-01-15T10:30:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Ngày cập nhật",
              example: "2024-01-15T10:30:00Z",
            },
          },
        },

        // Schema cho response error
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Thông báo lỗi",
              example: "Có lỗi xảy ra",
            },
          },
        },

        // Schema cho response success
        SuccessResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Thông báo thành công",
              example: "Tạo user thành công",
            },
            data: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
    },
  },
  // APIs sẽ được tìm kiếm ở các file này
  apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * Hàm khởi tạo Swagger UI
 * @param {Object} app - Express app instance
 */
export const setupSwagger = (app) => {
  // Route để xem Swagger UI
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        persistAuthorization: true, // Giữ lại token khi refresh
      },
    }),
  );

  // Route để lấy JSON spec
  app.get("/api-specs", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log("📚 Swagger UI available at http://localhost:3001/api-docs");
};

export default swaggerSpec;
