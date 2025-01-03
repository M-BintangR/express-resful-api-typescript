import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import bcrypt from "bcrypt";
import { ContactResponse } from "../model/contact-model";

export class ContactTest {
  static async deleteAll() {
    await prismaClient.contact.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prismaClient.contact.create({
      data: {
        first_name: "test",
        last_name: "test",
        email: "test@test.com",
        phone: "888",
        username: "test",
      },
    });
  }

  static async get(): Promise<ContactResponse> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        username: "test",
      },
    });

    if (!contact) {
      throw new Error("Contact is not found");
    }

    return contact;
  }
}

export class UserTest {
  static async delete() {
    const user = await prismaClient.user.deleteMany({
      where: { username: "test" },
    });
  }

  static async create() {
    const user = await prismaClient.user.create({
      data: {
        username: "test",
        name: "test",
        password: await bcrypt.hash("test", 10),
        token: "test",
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "test",
      },
    });

    if (!user) {
      throw new Error("User is not found");
    }

    return user;
  }
}
