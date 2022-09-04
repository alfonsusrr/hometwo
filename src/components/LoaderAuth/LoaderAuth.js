import PulseLoader from 'react-spinners/PulseLoader'

export default function LoaderAuth(props) {
    const {
        loading,
        color,
        authorized,
        children
    } = props

    return (
        <>
            <div className={`loader-container ${loading || (loading && !authorized) ? "inline-block" : "hidden"}`}>
                <PulseLoader color={color} loading={loading} size={20}></PulseLoader>
            </div>
            <div className={`${!loading && authorized ? "block" : "hidden"}`}>
                {children}
            </div>
        </>
    )
}