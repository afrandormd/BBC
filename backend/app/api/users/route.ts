// import next request and response
import { NextRequest, NextResponse } from "next/server";

// import prisma client
import  prisma from "@/prisma/client";
import { genSalt, hash } from "bcrypt-ts";

// import bcrypt-ts


// service GET ambil seluruh data users
export const GET = async (request: NextRequest) => {
  // get all users
  const users = await prisma.user.findMany(); 

  // return response JSON
  return NextResponse.json(
    {
      success: true,
      message: "Kumpulan Data Users",
      data: users,
    },
    {
      status: 200,
    }
  )
}

// service POST (tambah data user)
export const  POST = async (request: NextResponse) => {
  try {
    // get all request
    const {name, email, password, role} = await request.json()

    // validasi field wajib
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, dan password wajib diisi."
        },
        {
          status: 400,
        },
      )
    }

    // validasi apakah nama user sudah pernah dibuat atau belum
    const check = await prisma.user.findMany({
      where: {
        name: name,
      },
    })

    // jika data nama user ditemukan
    if (check.length === 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Data User Gagal Disimpan! Nama User Sudah Digunakan"
        },
        {
          status: 409,
        },
      )
    } 

    // validasi apakah email sudah terdaftar atau belum
    const existingUserEmail = await prisma.user.findFirst({
      where: {
        email: email
      }
    })

    // jika email sudah terdaftar
    if (existingUserEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Data User Gagal Disimpan! Email sudah terdaftar!",
        },
        {
          status: 400,
        },
      )
    }

    // Hash password    
    const setBcryptAsync = async (real_password: string) => {
      const salt = await genSalt(10)
      const hash_password = await hash(real_password, salt)
      return hash_password;
    }
    

    // create data user
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await setBcryptAsync(password),
        role: role,
      }
    })

    // return response JSON
    return NextResponse.json(
      {
        success: true,
        message: "Data User Berhasil Dibuat!",
        data: user,
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan Server!"
      },
      {
        status: 500,
      },
    )
  }
}
