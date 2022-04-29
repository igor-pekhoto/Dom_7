const { Link } = require('react-router-dom')

function PhonesItem({ name, phone, id }) {
  return (
    <Link className="list-group-item list-group-item-action" to={`/phones/${id}`}>
      <span className="pe-4">
        {name}
      </span>
      <span>

        {phone}
      </span>
    </Link>

  )
}

export default PhonesItem
