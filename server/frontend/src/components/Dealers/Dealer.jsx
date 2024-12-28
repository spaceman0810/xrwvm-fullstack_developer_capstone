import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png"
import neutral_icon from "../assets/neutral.png"
import negative_icon from "../assets/negative.png"
import review_icon from "../assets/reviewbutton.png"
import Header from '../Header/Header';

const Dealer = () => {


  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>)

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("dealer"));
  let params = useParams();
  let id =params.id;
  //let dealer_url = root_url+`djangoapp/dealer/${id}`;
  //let reviews_url = root_url+`djangoapp/reviews/dealer/${id}`;
  let dealer_url = root_url + `djangoapp/dealer/${id}/`;  // Remove 'details'

  let reviews_url = root_url + `djangoapp/reviews/dealer/${id}`;  // Reviews remains the same

  let post_review = root_url+`postreview/${id}`;
  
  const get_dealer = async () => {
    try {
      const res = await fetch(dealer_url, { method: "GET" });
      const retobj = await res.json();
      if (retobj.status === 200 && retobj.dealer) {
        setDealer(retobj.dealer);  // Ensure dealer data is in the expected structure
      } else {
        console.error("Failed to fetch dealer details:", retobj);
      }
    } catch (error) {
      console.error("Error fetching dealer data:", error);
    }
  }  

  const get_reviews = async () => {
    try {
      const res = await fetch(reviews_url, { method: "GET" });
      const retobj = await res.json();
      if (res.ok && retobj.reviews) {
        setReviews(retobj.reviews);
      } else {
        console.error('Failed to fetch reviews:', retobj);
        setUnreviewed(true);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setUnreviewed(true);
    }
  }  

  const senti_icon = (sentiment)=>{
    let icon = sentiment === "positive"?positive_icon:sentiment==="negative"?negative_icon:neutral_icon;
    return icon;
  }

  useEffect(() => {
    get_dealer();
    get_reviews();
    if (sessionStorage.getItem("username")) {
      setPostReview(
        <a href={post_review}>
          <img
            src={review_icon}
            style={{ width: "10%", marginLeft: "10px", marginTop: "10px" }}
            alt="Post Review"
          />
        </a>
      );
    }
    else {
        setPostReview(
            <a href="/register" style={{ marginLeft: "10px", marginTop: "10px", color: 'blue', textDecoration: 'underline', fontSize: '14px'}}>
            Register to Post a Review
          </a>
        );
      }
  }, []);
  
  useEffect(() => {
    console.log(dealer);  // Check if dealer data is correct
  }, [dealer]); 


return(
  <div style={{margin:"20px"}}>
      <Header/>
      <div style={{marginTop:"10px"}}>
      <h1 style={{ color: "grey" }}>
        {dealer.full_name}
        {postReview}
      </h1>
      <h4 style={{ color: "grey" }}>
        {dealer.city}, {dealer.address}, {dealer.zip}, {dealer.state}
      </h4>
      </div>
      <div className="reviews_panel">
        {reviews.length === 0 && !unreviewed ? (
        <p>Loading Reviews...</p>
    ) : unreviewed ? (
    <p>No reviews available for this dealer.</p>
) : (
    reviews.map((review, index) => (
        <div key={index} className="review_panel">
            <img src={senti_icon(review.sentiment)} alt="Sentiment" className="emotion_icon" />
            <div className="review">{review.review}</div>
            <div className="reviewer">
                {review.name} {review.car_make} {review.car_model} {review.car_year}
            </div>
        </div>
        ))
    )}
    </div>
  </div>
)
}

export default Dealer
