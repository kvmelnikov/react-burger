import { useSelector } from 'react-redux'
import ReportStyle from './report-feeds.module.css'

export function ReportFeeds() {
  const statusOrders = useSelector((state) => state.feed.statusOrders)
  return (
    <div className={`${ReportStyle.container} mt-25 ml-15`}>
      <div className={`${ReportStyle.headings} mb-6`}>
        <h3 className={`${ReportStyle.heading}`}>Готовы:</h3>
        <h3 className={`${ReportStyle.heading}`}>В работе:</h3>
      </div>
      <div className={`${ReportStyle.numbers}`}>
        <ul className={`${ReportStyle.list}`}>
          {statusOrders?.done?.map((element) => {
            return <li className={`${ReportStyle.number} text text_type_digits-default`}>{element}</li>
          })}
        </ul>
        <ul className={`${ReportStyle.list}`}>
          {statusOrders?.pending?.map((element) => {
            return <li className={`${ReportStyle.number} text text_type_digits-default`}>{element}</li>
          })}
        </ul>
      </div>
      <p className={`text text_type_main-medium mt-15 mb-0`}>Выполнено за все время:</p>
      <p className={`text text_type_digits-large`}>{statusOrders.allBurgers}</p>
      <p className={`text text_type_main-medium mt-15 mb-0`}>Выполнено за сегодня:</p>
      <p className={`text text_type_digits-large`}>{statusOrders.todayBurgers}</p>
    </div>
  )
}
