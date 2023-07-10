import ReportStyle from './report-feeds.module.css';

export function ReportFeeds() {
  return (
    <div className={`${ReportStyle.container} mt-25 ml-15`}>
      <div className={`${ReportStyle.headings} mb-6`}>
        <h3 className={`${ReportStyle.heading}`}>Готовы:</h3>
        <h3 className={`${ReportStyle.heading}`}>В работе:</h3>
      </div>
      <div className={`${ReportStyle.numbers}`}>
        <ul className={`${ReportStyle.list}`}>
          <li className={`${ReportStyle.number} text text_type_digits-default`}>
            031116
          </li>
          <li className={`${ReportStyle.number} text text_type_digits-default`}>
            052164
          </li>
        </ul>
        <ul className={`${ReportStyle.list}`}>
          <li className={`${ReportStyle.number} text text_type_digits-default`}>
            0654165
          </li>
          <li className={`${ReportStyle.number} text text_type_digits-default`}>
            1566
          </li>
        </ul>
      </div>
      <p className={`text text_type_main-medium mt-15 mb-0`}>
        Выполнено за все время:
      </p>
      <p className={`text text_type_digits-large`}>28 752</p>
      <p className={`text text_type_main-medium mt-15 mb-0`}>
        Выполнено за сегодня:
      </p>
      <p className={`text text_type_digits-large`}>138</p>
    </div>
  );
}
