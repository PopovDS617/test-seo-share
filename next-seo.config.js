
export const DEFAULT_TITLE='Тестовый сайт'
export const DEFAULT_DESCRIPTION="Описание тестового сайта"

export const OG_IMAGE={
    HEIGHT:600,
    WIDTH:1200,
}

const TWITTER_OG={
    handle:"@handle",
    site:"@site",
    cardType:"summary_large_image"
}

export default{
    defaultTitle:DEFAULT_TITLE,
    description:DEFAULT_DESCRIPTION,
    openGraph:{
        type:"website",
        locale:"ru_RU",
        title:DEFAULT_TITLE,
        site_name:DEFAULT_TITLE,
        

    },
    twitter:TWITTER_OG

}

