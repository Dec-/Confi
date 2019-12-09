import { Pool, PoolClient } from "pg";
import User from "./Modal/User";

const pool = new Pool({
    database: "postgres",
    password: "confi123",
    host: "localhost",
    port: 5432,
    user: "postgres"
});

pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

export class Dao {
    public static async getConferenes() {
        let client: PoolClient;
        try {
            client = await pool.connect();
            const { rows } = await client.query("SELECT * FROM conference");

            return rows;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    public static async insertIntoBookings(user: User, conferenceId: number) {
        let client: PoolClient;
        try {
            client = await pool.connect();
            await client.query("BEGIN");
            const resConfiUser = await client.query(`INSERT INTO confi_user (firstname, lastname, email, phoneNumber)
                VALUES ($1, $2, $3, $4) RETURNING id`, [user.firstname, user.lastname, user.email, user.phoneNumber]);

            const resBooking = await client.query(`INSERT INTO booking (conferenceId, confiUserId)
                VALUES ($1, $2)`, [conferenceId, resConfiUser.rows[0].id]);

            await client.query("COMMIT");

        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }

    public static async getBookings() {
        let client: PoolClient;
        try {
            client = await pool.connect();

            const { rows } = await client.query(`SELECT b.id, c."name", c.room, u.firstname, u.lastname, u.email, u.phonenumber
                FROM booking b INNER JOIN conference c on (b.conferenceid = c.id)
                INNER JOIN confi_user u on (b.confiuserid = u.id)`);

            return rows;

        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    public static async deleteBooking(bookingId: number) {
        let client: PoolClient;
        try {
            client = await pool.connect();
            const deletedRow = await client.query(`DELETE FROM booking WHERE id = $1 returning id`, [bookingId]);
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    public static async truncateTables() {
        let client: PoolClient;
        try {
            client = await pool.connect();
            await client.query(`TRUNCATE TABLE confi_user RESTART IDENTITY`);
            await client.query(`TRUNCATE TABLE booking RESTART IDENTITY`);
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
}

export default Dao;
