# 构建前端
FROM node:20 AS frontend-builder
WORKDIR /frontend
COPY frontend/package*.json frontend/yarn.lock ./
RUN node --version && yarn --version
RUN yarn install --frozen-lockfile
COPY frontend .
RUN yarn build

# 构建后端
FROM golang:1.23 as backend-builder
WORKDIR /app
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend .
# 复制前端构建文件到后端的静态文件目录
COPY --from=frontend-builder /frontend/dist ./static
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/server

# 最终镜像
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=backend-builder /app/main .
COPY --from=backend-builder /app/internal/config/config.yaml ./internal/config/
COPY --from=backend-builder /app/static ./static
EXPOSE 8080
CMD ["./main"]
