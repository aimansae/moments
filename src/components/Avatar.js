import React from 'react'

const Avatar = (props) => {
    const { src, height = 45, text } = props
    return (
        <span>
            <img className={StyleSheet.Avatar}
                src={src}
                height={height}
                width={height}
                alt='avatar'
            />
            {text}
        </span>
    )
}

export default Avatar