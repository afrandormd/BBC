// import next response and request
import { NextRequest, NextResponse } from "next/server";

// import prisma client
import  prisma from "@/prisma/client";

// import bcrypt-ts
import { genSalt, hash } from "bcrypt-ts";

// import fungsi cek JWT
import { checkJwt } from "../../general";

// Service DELETE data user
export const DELETE = async (request: NextRequest, {params}: {params: {id: string}}) => {
  // panggil fungsi cek token "checkJWT"
  if(checkJwt(request)) {
    return checkJwt(request)
  }

  // cek apakah data user ada 
  const checkUser = await prisma.user.findUnique({
    where: {
      id: Number(params.id)
    }
  })

  // jika data tidak ditemukan
  if (!checkUser) {
    return NextResponse.json(
      {
        success: false,
        message: "Data User Tidak Ada!",
      },
      {
        status: 404,
      },
    )
  }

  // proses delete data
  const deleteUser = await prisma.user.delete({
    where: {
      id: Number(params.id),
    },
  })

  // return response json DELETE
  return NextResponse.json(
    {
      success: true,
      message: "Data User Berhasil di Hapus!",
    },
    {
      status: 200,
    }
  )
}

// service GET detail data user
export const GET = async (request: NextRequest, {params}: {params: {id: string}}) => {
  try {
    // cek apakah data user ada 
    const checkUser = await prisma.user.findUnique({
      where: {
        id: Number(params.id)
      }
    })

    // jika data user tidak ditemukan 
    if (!checkUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Data User Tidak Ditemukan!"
        },
        {
          status: 404,
        }
      )
    }

    // response jika data user ditemukan
    return NextResponse.json(
      {
        success: true,
        message: "Detail Data User",
        data: checkUser,
      },
      {
        status: 200,
      }
    ) 
  } catch (error: any) {
   return NextResponse.json(
      {
        success: false,
        message: "Parameter slug harus angka!",
      },
      {
        status: 400,
      }
    ) 
  }
}

// Service PUT edit data user
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }>}) {

  // get params id
  const params = await props.params

  // validasi parameter / slug id
  if (isNaN(Number(params.id))) {
    return NextResponse.json(
      {
        success: false,
        message: "Parameter atau Slug ID harus angka!",
      },
      {
        status: 400
      }
    )
  }

  // cek apakah data user ada atau tidak
  const checkUser = await prisma.user.findUnique({
    where: {
      id: Number(params.id)
    }
  })

  // response jika data user tidak ditemukan 
  if (!checkUser) {
    return NextResponse.json(
      {
        success: false,
        message: "Data User Tidak Ditemukan!"
      },
      {
        status: 404,
      }
    )
  }

  // get all request
  const {name, email, password, role} = await request.json()

  // validasi apakah nama user sudah pernah dibuat atau belum
  const checkName = await prisma.user.findMany({
    where: {
      name: name,
    },
  })

  // jika data nama user ditemukan
  if (checkName.length === 1) {
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
        status: 409,
      },
    )
  }

  // Hash password    
  const setBcryptAsync = async (real_password: string) => {
    const salt = await genSalt(10)
    const hash_password = await hash(real_password, salt)
    return hash_password;
  }

  // fungsi edit data
  const editUser = await prisma.user.update({
    where: {
      id: Number(params.id),
    },
    data: {
      name: name,
      email: email,
      password: await setBcryptAsync(password),
      role: role,
      updatedAt: new Date(),
    },
  })

  // response ketika data user berhasil di ubah
  return NextResponse.json(
    {
      success: true,
      message: "Data User Berhasil di Ubah!",
      data: editUser,
    },
    {
      status: 200,
    },
  )

}



