// import next and request response
import { NextRequest, NextResponse } from "next/server";

// import helpers prisma client
import prisma from "@/prisma/client";
import { checkJwt } from "../../general";

// service GET detail data
export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    // get params id
    const params = await props.params

    // cek apakah id ada atau tidak
    const product = await prisma.product.findUnique({
      where: {
        id: Number(params.id),
      }
    })

    // jika data produk tidak ditemukan
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Data Produk Tidak Ditemukan!"
        },
        {
          status: 404,
        }
      )
    }

    // jika data produk ditemukan -> response json
    return NextResponse.json(
      {
        success: true,
        message: "Detail Data Produk",
        data: product,
      },
      {
        status: 200,
      }
    )
    
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Parameter slug harus angka !",
      },
      {
        status: 400,
      }
    ) 
  }
}

// service PUT (update) data product
export const PUT = async (request: NextRequest, props: { params: Promise<{ id: string }>}) => {
  // panggil fungsi cek token "checkJWT"
  if (checkJwt(request)) {
    return checkJwt(request)
  }

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

  // cek apakah id ada atau tidak
  const product = await prisma.product.findUnique({
    where: {
      id: Number(params.id),
    }
  }) 

  // jika data produk tidak ditemukan
  if (!product) {
    return NextResponse.json(
      {
        success: false,
        message: "Data Produk Tidak Ditemukan!"
      },
      {
        status: 404,
      }
    )
  }

  // buat data objek untuk isian
  const { name, price, description, image, category} = await request.json()

  // validasi data yang diterima
  if(!name || !price || !description || !image || !category) {
    return NextResponse.json(
      {
        success: false,
        message: "Semua field harus diisi!",
      },
      {
        status: 400
      }
    )
  }

  // check apakah nama produk sudah ada atau belum (kecuali produk dengan id yang sama)
  const checkNameProduct = await prisma.product.findFirst({
    where: {
      name: name,
      NOT: {id: Number(params.id)}
    },
  })

  // jika data nama produk ditemukan di produk lain
  if (checkNameProduct) {
    return NextResponse.json(
      {
        success: false,
        message: "Data Produk Gagal Diubah! Nama produk telah terdaftar."
      },
      {
        status: 409,
      }
    )
  }

  // fungsi edit data
  const edit = await prisma.product.update({
    where: {
      id: Number(params.id),
    },
    data: {
      name: name,
      price: price,
      description: description,
      image: image,
      category: category,
      updatedAt: new Date(),
    },
  })

  // return response json
  return NextResponse.json(
    {
      success: true,
      message: "Data produk berhasil di ubah!",
      data: edit,
    },
    {
      status: 200,
    }
  )

}


// service DELETE data products 
export const DELETE = async (request: NextRequest, props: { params: Promise<{ id: string }> }) => {
  // panggil fungsi cek token "checkJWT"
  if (checkJwt(request)) {
    return checkJwt(request)
  }

  // get params id
  const params = await props.params

  // cek apakah data produk ada 
  const product = await prisma.product.findUnique({
    where: {
      id: Number(params.id)
    }
  })

  // jika data tidak ditemukan
  if (!product) {
    return NextResponse.json(
      {
        success: false,
        message: "Data produk tidak ada!",
      }, 
      {
        status: 404,
      },
    )
  }

  // proses delete data
  const deleteProduct = await prisma.product.delete({
    where: {
      id: Number(params.id),
    },
  }) 

  // return response json
  return NextResponse.json(
    {
      success: true,
      message: "Data produk berhasil di hapus!",
    },
    {
      status: 200,
    },
  )
}



