import { Table } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { Customer } from './Customer'

export const sumTotal = (orders: Customer['orders']): string => {
  return orders
    .reduce((total, item) => {
      return total + item.itemCost
    }, 0)
    .toFixed(2)
}

interface Props {
  customers: Customer[]
}

const ListView = ({ customers }: Props) => {
  const history = useHistory()

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>firstName</th>
          <th>lastName</th>
          <th>address</th>
          <th>city</th>
          <th>state</th>
          <th>order total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <tr
            key={customer.id}
            onClick={() => {
              history.push(`/customers/${customer.id}/detail`)
            }}
          >
            <td>
              <img
                width="50px"
                src={
                  customer.gender === 'male'
                    ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Crystal_Clear_app_kuser.svg/1024px-Crystal_Clear_app_kuser.svg.png'
                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1024px-Crystal_Clear_kdm_user_female.svg.png'
                }
                alt=""
              />
            </td>
            <td>{customer.firstName}</td>
            <td>{customer.lastName}</td>
            <td>{customer.address}</td>
            <td>{customer.city}</td>
            <td>{customer.state.name}</td>
            <td>
              {customer.hasOwnProperty('orders') ? (
                sumTotal(customer.orders)
              ) : (
                <span className="text-danger">no order</span>
              )}
            </td>
            <td>
              <span className="text-primary" style={{ cursor: 'pointer' }}>
                View orders
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ListView
