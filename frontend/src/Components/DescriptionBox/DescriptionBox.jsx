import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">  
            <div className="descriptionbox-nav-box">
                Description
            </div>
            <div className="descriptionbox-nav-box fade">
                Reviews (112)
            </div>
            <div className="descriptionbox-description">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque saepe dolores amet commodi, dolore nobis voluptate, libero suscipit quisquam mollitia debitis id ipsum delectus animi eveniet perferendis? Unde illo aspernatur in. Ad minima ipsam magni incidunt distinctio sunt, doloribus expedita.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil reiciendis culpa illum voluptates facere, explicabo eius sapiente temporibus maxime accusamus possimus deserunt eaque commodi qui exercitationem animi officiis? Odio, distinctio!</p>
            </div>
        </div>
    </div>
  )
}

export default DescriptionBox