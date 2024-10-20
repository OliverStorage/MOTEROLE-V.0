import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate, Link } from 'react-router-dom'

const Actionbtn = ({
    icon: Icon,
    bgColor = '#8D8686', // Default to stone color in hex
    text = 'Back',
    onClick,
    isLink = true, // If this should be a link
    to = '#', // Default link target
    disabled = false, // New disabled prop
}) => {
    const navigate = useNavigate()

    // Default function to navigate one step back
    const defaultOnClick = () => {
        if (!disabled) {
            navigate(-1)
        }
    }

    // Use inline styles to set dynamic background color
    const buttonStyle = {
        backgroundColor: disabled ? '#d3d3d3' : bgColor, // Change to gray when disabled
        cursor: disabled ? 'not-allowed' : 'pointer', // Change cursor when disabled
        opacity: disabled ? 0.6 : 1, // Make button/link look faded when disabled
    }

    const buttonClasses = `size-12 mobile:size-10 ipad:size-14 flex items-center justify-center rounded-xl text-center text-white action-btn`

    return (
        <div>
            {isLink ? (
                <Link
                    to={disabled ? '#' : to} // Prevent navigation if disabled
                    className={buttonClasses}
                    style={buttonStyle}
                    onClick={(e) => disabled && e.preventDefault()} // Prevent action if disabled
                >
                    {typeof Icon === 'string' ? (
                        <img
                            src={Icon}
                            alt="icon"
                            className="size-12 p-1 mobile:size-10 ipad:size-14"
                        />
                    ) : (
                        Icon && (
                            <Icon className="size-12 p-1 mobile:size-10 ipad:size-14" />
                        )
                    )}
                    {text}
                </Link>
            ) : (
                <button
                    onClick={disabled ? null : onClick || defaultOnClick} // Disable onClick if disabled
                    className={buttonClasses}
                    style={buttonStyle}
                    disabled={disabled} // Disable button functionality
                >
                    {typeof Icon === 'string' ? (
                        <img
                            src={Icon}
                            alt="icon"
                            className="size-12 p-1 mobile:size-10 ipad:size-14"
                        />
                    ) : (
                        Icon && (
                            <Icon className="size-12 p-1 mobile:size-10 ipad:size-14" />
                        )
                    )}
                    {text}
                </button>
            )}
        </div>
    )
}

Actionbtn.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string])
        .isRequired,
    bgColor: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    isLink: PropTypes.bool,
    to: PropTypes.string,
    disabled: PropTypes.bool, // PropType for the new disabled prop
}

export default Actionbtn
