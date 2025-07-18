'use client'
interface Props {
    error: Error
}
const ErrorPage = ({ error,}: Props) => {
  return (
    <>
      <div>An unexpected error has occurred.</div>
      {/* <button className='btn btn-primary' onClick={() => reset()}> </button> */} 
    </>
  )
}

export default ErrorPage