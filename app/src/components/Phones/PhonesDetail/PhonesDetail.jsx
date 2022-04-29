import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../../Modal/Modal'
import Form from '../Form/Form'

function PhonesDetail() {
  const { phonesId } = useParams()
  const navigate = useNavigate()
  const [viewModal, setViewModal] = useState(false)

  const controller = useRef(new AbortController())

  const [phone, setPhone] = useState({})

  useEffect(() => {
    console.log('before')

    fetch(`http://localhost:3000/api/v1/phones/${phonesId}`, { signal: controller.current.signal })
      .then((response) => response.json())
      .then((dataFromServer) => setPhone(dataFromServer))

    return () => {
      controller.current.abort()
    }
  }, [])

  const openModal = () => {
    setViewModal(true)
  }

  const closeModal = () => {
    setViewModal(false)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    console.log()

    const formData = Object.fromEntries(new FormData(e.target).entries())

    const response = await fetch(`http://localhost:3000/api/v1/phones/${phone.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.status === 200) {
      const updatedPhoneFromServer = await response.json()
      setPhone(updatedPhoneFromServer)
      closeModal()
      e.target.reset()
    } else {
      alert('Wrong data')
    }
  }

  const content = () => {
    if (!phone.id) {
      return <strong>Loading...</strong>
    }

    return (
      <>
        <div className="card" style={{ width: '18rem' }}>
          <img src={phone.pic} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{phone.name}</h5>
            <p className="card-text">{phone.phone}</p>
            <button type="button" onClick={() => navigate(-1)} className="btn btn-primary mx-1">Go back</button>
            <button type="button" onClick={openModal} className="btn btn-success mx-1">Edit</button>
          </div>
        </div>
        <Modal
          state={viewModal}
          onClose={closeModal}
        >
          <Form
            onSubmit={submitHandler}
            {...phone}
          />
        </Modal>
      </>
    )
  }

  return (
    <div className="d-flex justify-content-center">
      {content()}
    </div>
  )
}

export default PhonesDetail
