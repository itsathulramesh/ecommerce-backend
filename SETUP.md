# Prisma Setup & Database Initialization

This guide explains how to set up Prisma for the Ecommerce Backend, initialize the database, and import existing data.

## Prerequisites

- **Node.js**: Ensure Node.js is installed.
- **PostgreSQL**: You need a running PostgreSQL instance (either installed on your system or running in a Docker container).

## 1. Environment Configuration

1.  Copy the example environment file (if available) or create a `.env` file in the root directory.
2.  Set the `DATABASE_URL` variable in `.env` to point to your PostgreSQL database.

    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    ```
    *   Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your actual credentials.
    *   **Docker Example**: `postgresql://postgres:password@localhost:5432/ecommerce_db?schema=public`
    *   **System Example**: `postgresql://myuser:mypassword@localhost:5432/ecommerce_db?schema=public`

## 2. Installation & Initialization

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Initialize Prisma (Only for new projects, already done here):
    *   If you were starting from scratch, you would run `npx prisma init`.
    *   Since this project is already set up, you just need to generate the client.

3.  Generate Prisma Client:
    This creates the customized Prisma Client based on your `schema.prisma`.
    ```bash
    npx prisma generate
    ```

## 3. Database Migrations

To keep your database schema in sync with your Prisma schema:

*   **Development**: To apply migrations and create the database if it doesn't exist:
    ```bash
    npx prisma migrate dev --name init
    ```
    *   Use `--name` to give your migration a descriptive name if you are creating a new one.
    *   If you just want to apply existing migrations without creating new ones (e.g., in a new environment), you can simply run `npx prisma migrate dev`.

*   **Production/CI**:
    ```bash
    npx prisma migrate deploy
    ```

## 4. Importing Data (The Dump)

If you have a database dump (e.g., `dump/dump.sql`) and want to restore it into your configured Database.

### Option A: Using System PostgreSQL (`psql`)

If you have PostgreSQL installed locally on your system:

```bash
psql -U <username> -d <database_name> -f dump/dump.sql
```
*   You might be prompted for your password.
*   Example: `psql -U postgres -d ecommerce_db -f dump/dump.sql`

### Option B: Using Docker Container

If your database is running inside a Docker container:

1.  Identify your container name (e.g., `postgres_container`).
2.  Run the following command to pipe the dump file into the container's psql tool:

```bash
cat dump/dump.sql | docker exec -i <container_name> psql -U <username> -d <database_name>
```

*   **Windows PowerShell**:
    ```powershell
    Get-Content dump/dump.sql | docker exec -i <container_name> psql -U <username> -d <database_name>
    ```
*   Example: `cat dump/dump.sql | docker exec -i ecommerce_db psql -U postgres -d ecommerce_db`

## 5. Verification

To verify that everything is set up correctly:

1.  Open Prisma Studio to view your data:
    ```bash
    npx prisma studio
    ```
    This will open a web interface at `http://localhost:5555`.

2.  Or check via command line if you have `psql` or a database client connecting to your database.
