import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function AcademicCalendarManagement() {
    useTranslation();

    return (
        <>
            <h2>{t('academic_calendar_management')}</h2>
        </>
    )
}