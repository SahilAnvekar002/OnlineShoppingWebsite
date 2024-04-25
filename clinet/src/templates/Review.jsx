import React, { useContext, useEffect, useState } from 'react'
import moment from "moment"
import { getRequest, url } from '../utils/services'
import { UserContext } from '../contexts/UserContext'

function Review(props) {

    const userContext = useContext(UserContext)
    const { user } = userContext

    const { review, editReview, deleteReview } = props

    const [reviewUser, setReviewUser] = useState(null)
    const [reviewInfo, setReviewInfo] = useState({
        title:'',
        description:'',
        rating:''
      })

    useEffect(() => {

        const getUser = async () => {
            const response = await getRequest(`${url}/user/getuser/${review?.userId}`)
            setReviewUser(response)
        }

        getUser()

        setReviewInfo({...reviewInfo, title: review?.title, description: review?.description, rating: review?.rating})
        // eslint-disable-next-line
    }, [review])

    const getRating = (rating) => {
        let temp = []
        for (let index = 0; index < rating; index++) {
            temp.push(index)
        }
        return temp
    }

    const updateReviewInfo = (info)=>{
        setReviewInfo(info)
    }

    return (
        <>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <p>
                            <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html" style={{ textDecoration: 'none', marginRight: '10px', fontSize: '20px', color: '#212529' }}><strong>{reviewUser?.username}</strong></a>

                            {getRating(review?.rating).map((rating) => {
                                return (
                                    <i className="bi-star-fill" key={rating} style={{ marginRight: '3px', color: 'rgb(255, 193, 7)' }}></i>
                                )
                            })}
                            {user?._id === reviewUser?._id && <i className="fa-solid fa-pen-to-square mx-3" style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target={`#exampleModal${review?._id}`}></i>}

                            {user?._id === reviewUser?._id && <i className="fa-solid fa-trash" style={{ cursor: 'pointer' }} onClick={()=>deleteReview(review?._id)}></i>}
                        </p>
                        <div className="clearfix"></div>
                        <p>{review?.description}</p>
                        <p className="text-secondary">{moment(review?.date).calendar()}</p>
                    </div>
                </div>
            </div>
            <hr />

            <div class="modal fade" id={`exampleModal${review?._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Update Review</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="mb-3" >
                                <input type="text" className="form-control shadow-none" id='title' placeholder="Title" value={reviewInfo?.title} onChange={(e)=>updateReviewInfo({...reviewInfo, title: e.target.value})}/>
                            </div>
                            <div className="mb-3" >
                                <textarea className="form-control shadow-none" id="review" rows="4" style={{ resize: 'none' }} placeholder='Description' value={reviewInfo?.description} onChange={(e)=>updateReviewInfo({...reviewInfo, description: e.target.value})}></textarea>
                            </div>
                            <div className="mb-3" >
                                <input type="number" className="form-control shadow-none" id='rating' placeholder="Rating" value={reviewInfo?.rating} onChange={(e)=>updateReviewInfo({...reviewInfo, rating: e.target.value})}/>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-dark" data-bs-dismiss="modal" onClick={()=>editReview(reviewInfo, review?._id)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Review
