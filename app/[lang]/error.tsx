'use client'
interface Props {
    error: Error
}
const ErrorPage = ({ error,}: Props) => {
    console.log("Error", error)
  return (
    <>
      <div>An unexpected error has occurred.</div>
      {/* <button className='btn btn-primary' onClick={() => reset()}> </button> */} 
    </>
  )
}

export default ErrorPage