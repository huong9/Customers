import axios from 'axios'
import { useEffect, useState } from 'react'
import { FormSelect, Pagination } from 'react-bootstrap'
import { baseUrl } from '../constants/baseUrl'
import CardView from './CardView'
import ListView from './ListView'

export interface Customer {
  id: number
  firstName: string
  lastName: string
  gender: string
  address: string
  city: string
  state: State
  orders: Order[]
  latitude: number
  longitude: number
}

export interface State {
  abbreviation: string
  name: string
}

export interface Order {
  productName: string
  itemCost: number
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [orderBy, setOrderBy] = useState<keyof Customer>('id')
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [listCustomers, setListCustomers] = useState<Customer[]>([])
  const [toggleList, setToggleList] = useState<boolean>(false)
  const pageSize = 5

  useEffect(() => {
    axios.get(baseUrl + '/api/customers').then(res => setCustomers(res.data))
  }, [])

  const sortUsers = (customers: Customer[]): Customer[] => {
    return customers.sort((a, b) => {
      if (typeof a[orderBy] === 'number') {
        return (a[orderBy] as number) - (b[orderBy] as number)
      }

      return (('' + a[orderBy]) as string).localeCompare(b[orderBy] as string)
    })
  }

  const renderData = () => {
    const data = [...customers]
    const data1 = sortUsers(data)

    const total = Math.ceil(data1.length / pageSize)
    setTotalPages(total)

    setListCustomers(data1)
  }

  useEffect(() => {
    renderData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customers, orderBy, currentPage])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listCustomers])

  const paginate = () => {
    const link = []
    for (let i = 1; i <= totalPages; i++) {
      link.push(
        <Pagination.Item
          onClick={() => {
            setCurrentPage(i)
          }}
          key={i}
          active={i === currentPage}
        >
          {i}
        </Pagination.Item>
      )
    }
    return link
  }

  const paginateData = (customers: Customer[]): Customer[] => {
    return customers.slice(
      (currentPage - 1) * pageSize,
      (currentPage - 1) * pageSize + pageSize
    )
  }

  const prevPage = () => {
    const newPage = Math.max(currentPage - 1, 1)
    setCurrentPage(newPage)
  }

  const nextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages)
    setCurrentPage(newPage)
  }

  return (
    <>
      <div className="d-flex mb-3">
        <button
          onClick={() => {
            setToggleList(false)
          }}
        >
          Card view
        </button>
        <button
          onClick={() => {
            setToggleList(true)
          }}
        >
          List view
        </button>
        <button>+ new customer</button>
        <FormSelect
          className="form-orderby ms-4"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setOrderBy(event.target.value as keyof Customer)
          }}
        >
          <option value="id">id</option>
          <option value="firstName">firstName</option>
          <option value="lastName">lastName</option>
          <option value="gender">gender</option>
          <option value="address">address</option>
          <option value="city">city</option>
        </FormSelect>
      </div>

      {toggleList ? (
        <ListView customers={paginateData(listCustomers)} />
      ) : (
        <CardView customers={paginateData(listCustomers)} />
      )}

      <Pagination>
        <Pagination.Prev onClick={prevPage}>prev</Pagination.Prev>
        {paginate()}
        <Pagination.Next onClick={nextPage}>next</Pagination.Next>
      </Pagination>
    </>
  )
}

export default Customers
