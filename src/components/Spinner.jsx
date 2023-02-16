import SpinnerStyle from '../styling/Spinner.module.scss'

const Spinner = () => {
    return (
        <div className={SpinnerStyle.spinnerbody}>
            <div className={SpinnerStyle.loadspinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
export default Spinner;