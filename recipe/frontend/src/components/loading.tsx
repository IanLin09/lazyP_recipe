import loadingImg from "@/assets/img/loadingcircles.gif"

export const LoadingScene = () => {
    return (
        <>
            <div className='text-center'>
                <img className='image-origin' src={loadingImg}></img>
            </div>
        </>
    )
}