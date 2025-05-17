# Use the official Bun image
FROM oven/bun:1 as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1-slim

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lockb ./

# Install only production dependencies
RUN bun install --frozen-lockfile --production

# Install serve globally
RUN bun install -g serve

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]
