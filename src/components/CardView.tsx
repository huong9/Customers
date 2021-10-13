import { useHistory } from 'react-router'
import { Customer } from './Customer'

interface Props {
  customers: Customer[]
}

const CardView = ({ customers }: Props) => {
  const history = useHistory()

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {customers.map(customer => (
        <div
          key={customer.id}
          className="item-card-view border p-3 m-2 bg-light"
          onClick={() => {
            history.push(`/customers/${customer.id}/detail`)
          }}
        >
          <h3 className="text-primary">
            {customer.firstName} {customer.lastName}
          </h3>
          <div className="d-flex">
            <img
              width="100px"
              src={
                customer.gender === 'male'
                  ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Crystal_Clear_app_kuser.svg/1024px-Crystal_Clear_app_kuser.svg.png'
                  : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1024px-Crystal_Clear_kdm_user_female.svg.png'
              }
              alt=""
            />
            <div>
              <p>{customer.city}</p>
              <p>{customer.state.name}</p>
              <span className="text-primary" style={{ cursor: 'pointer' }}>
                View orders
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardView
