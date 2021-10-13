import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { baseUrl } from '../constants/baseUrl'
import { Customer } from './Customer'

const CustomerDetail = () => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const [customer, setCustomer] = useState<Customer | null>(null)

  useEffect(() => {
    axios
      .get(baseUrl + '/api/customers/' + id)
      .then(res => setCustomer(res.data))
  }, [id])
  console.log(id)

  return (
    <>
      <h3>Customer Information</h3>
      {customer && (
        <div>
          <img
            width="100px"
            src={
              customer.gender === 'male'
                ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Crystal_Clear_app_kuser.svg/1024px-Crystal_Clear_app_kuser.svg.png'
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1024px-Crystal_Clear_kdm_user_female.svg.png'
            }
            alt=""
          />

          <h3>
            {customer.firstName} {customer.lastName}
          </h3>
          <p>{customer.address}</p>
          <p>{customer.city}</p>
        </div>
      )}

      <span
        className="text-primary"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          history.push('/customers')
        }}
      >
        View all customers
      </span>
    </>
  )
}

export default CustomerDetail
