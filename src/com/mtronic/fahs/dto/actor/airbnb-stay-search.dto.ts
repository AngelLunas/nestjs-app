export interface AirbnbStaySearchDto {
    city: string;
    data: AirbnbStaySearchDtoData;
}

export interface AirbnbStaySearchDtoData {
    data:       DataData;
    extensions: Extensions;
}

export interface DataData {
    presentation: Presentation;
}

export interface Presentation {
    __typename: string;
    explore:    Explore;
}

export interface Explore {
    __typename: string;
    sections:   Sections;
}

export interface Sections {
    __typename:             string;
    sections:               any[];
    sectionsV2:             null;
    screens:                any[];
    screensV2:              null;
    flows:                  any[];
    metadata:               SectionsMetadata;
    stateMutation:          StateMutation;
    responseType:           string;
    responseTransforms:     null;
    sectionIndependentData: SectionIndependentData;
}

export interface SectionsMetadata {
    __typename:     string;
    debugMetadata:  any[];
    errorData:      null;
    loggingContext: MetadataLoggingContext;
    pageMetadata:   PageMetadata;
    pageTitle:      string;
    theme:          string;
}

export interface MetadataLoggingContext {
    __typename:               string;
    federatedSearchId:        string;
    federatedSearchSessionId: string;
    pageLoggingContext:       PageLoggingContext;
}

export interface PageLoggingContext {
    __typename:   string;
    extraData:    ExtraData;
    pageCategory: null;
    pageType:     string;
    pageVertical: string;
}

export interface ExtraData {
    flex_mode:    string;
    flex_version: string;
}

export interface PageMetadata {
    __typename:          string;
    androidAlternateUrl: string;
    androidDeeplink:     string;
    canonicalUrl:        null;
    iphoneDeeplink:      string;
    locationQuery:       boolean;
    ogTags:              OgTags;
    pageDescription:     string;
    pageTitle:           string;
    renderType:          string;
    twitterTags:         TwitterTags;
}

export interface OgTags {
    __typename:    string;
    ogDescription: string;
    ogImage:       string;
    ogTitle:       string;
    ogType:        string;
    ogUrl:         string;
}

export interface TwitterTags {
    __typename:         string;
    twitterCard:        string;
    twitterDescription: string;
    twitterImage:       string;
    twitterTitle:       string;
    twitterUrl:         string;
}

export interface SectionIndependentData {
    __typename:     string;
    staysSearch:    StaysSearch;
    staysMapSearch: StaysMapSearch;
}

export interface StaysMapSearch {
    __typename:       string;
    mapMetadata:      MapMetadata;
    mapSearchResults: SearchResult[];
    staysInViewport:  StaysInViewport[];
    loggingMetadata:  StaysMapSearchLoggingMetadata;
}

export interface StaysMapSearchLoggingMetadata {
    __typename:                   string;
    legacyLoggingBackendSearchId: string;
    legacyLoggingSectionId:       string;
}

export interface MapMetadata {
    __typename:                   string;
    bookingScoresByMapCellTokens: any[];
}

export interface SearchResult {
    __typename:            MapSearchResultTypename;
    listing:               Listing;
    listingParamOverrides: null;
    pricingQuote:          PricingQuote;
}

export enum MapSearchResultTypename {
    StaySearchResult = "StaySearchResult",
}

export interface Listing {
    __typename:                 ListingTypename;
    avgRatingA11yLabel:         null | string;
    avgRatingLocalized:         null | string;
    city:                       City;
    contextualPictures:         ContextualPicture[];
    contextualPicturesCount:    number;
    contextualPicturesPageInfo: ContextualPicturesPageInfo;
    coordinate:                 Coordinate;
    formattedBadges:            FormattedBadge[];
    id:                         string;
    listingObjType:             ListingObjType;
    localizedCityName:          City;
    name:                       string;
    pdpUrlType:                 PDPURLType;
    roomTypeCategory:           RoomTypeCategory;
    roomTypeId:                 null;
    structuredContent:          StructuredContent;
    tierId:                     number;
    title:                      ListingTitle;
    titleLocale:                TitleLocale;
    primaryHostPassport:        null;
}

export enum ListingTypename {
    StaySearchResultListing = "StaySearchResultListing",
}

export enum City {
    Miami = "Miami",
    MiamiBeach = "Miami Beach",
    NorthMiamiBeach = "North Miami Beach",
}

export interface ContextualPicture {
    __typename:             ContextualPictureTypename;
    caption:                Caption | null;
    dominantSaturatedColor: null;
    id:                     string;
    largeRo:                null;
    originalPicture:        null;
    picture:                string;
    previewEncodedPng:      null;
    saturatedA11yDarkColor: null;
    scrimColor:             null;
    xlPicture:              null;
}

export enum ContextualPictureTypename {
    ExplorePicture = "ExplorePicture",
}

export interface Caption {
    __typename:        CaptionTypename;
    formattedMessages: null;
    kickerBadge:       null;
    messages:          string[];
    textColor:         null;
}

export enum CaptionTypename {
    ExploreKickerContent = "ExploreKickerContent",
}

export interface ContextualPicturesPageInfo {
    __typename:      ContextualPicturesPageInfoTypename;
    endCursor:       EndCursor | null;
    hasNextPage:     boolean;
    hasPreviousPage: boolean;
    startCursor:     null;
}

export enum ContextualPicturesPageInfoTypename {
    PageInfo = "PageInfo",
}

export enum EndCursor {
    Nq = "NQ==",
}

export interface Coordinate {
    __typename: CoordinateTypename;
    latitude:   number;
    longitude:  number;
}

export enum CoordinateTypename {
    Coordinate = "Coordinate",
}

export interface FormattedBadge {
    __typename:     FormattedBadgeTypename;
    loggingContext: FormattedBadgeLoggingContext;
    style:          Style;
    text:           TextEnum;
    textColor:      TextColor;
}

export enum FormattedBadgeTypename {
    ExploreFormattedBadge = "ExploreFormattedBadge",
}

export interface FormattedBadgeLoggingContext {
    __typename: LoggingContextTypename;
    badgeType:  BadgeType;
}

export enum LoggingContextTypename {
    ExploreFormattedBadgeLoggingContext = "ExploreFormattedBadgeLoggingContext",
}

export enum BadgeType {
    GuestFavorite = "GUEST_FAVORITE",
    Superhost = "SUPERHOST",
}

export enum Style {
    LoudRoundedPill = "LOUD_ROUNDED_PILL",
    MutedRoundedPill = "MUTED_ROUNDED_PILL",
}

export enum TextEnum {
    FavoritoEntreHuéspedes = "Favorito entre huéspedes",
    Superanfitrión = "Superanfitrión",
}

export enum TextColor {
    Ffffff = "#FFFFFF",
    The000000 = "#000000",
}

export enum ListingObjType {
    Regular = "REGULAR",
    Representative = "REPRESENTATIVE",
}

export enum PDPURLType {
    Rooms = "ROOMS",
}

export enum RoomTypeCategory {
    EntireHome = "entire_home",
}

export interface StructuredContent {
    __typename:       StructuredContentTypename;
    distance:         null;
    mapCategoryInfo:  null;
    mapPrimaryLine:   PrimaryLine[];
    mapSecondaryLine: null;
    primaryLine:      PrimaryLine[];
    secondaryLine:    null;
}

export enum StructuredContentTypename {
    ExploreStructuredContent = "ExploreStructuredContent",
}

export interface PrimaryLine {
    __typename:    MapPrimaryLineTypename;
    body:          Body;
    bodyA11yLabel: null;
    bodyType:      null;
    fontWeight:    null;
    headline:      null;
    type:          null;
}

export enum MapPrimaryLineTypename {
    MainSectionMessage = "MainSectionMessage",
}

export enum Body {
    The1Cama = "1 cama",
    The1CamaTamañoKing = "1 cama tamaño king",
    The1CamaTamañoQueen = "1 cama tamaño queen",
    The2Camas = "2 camas",
    The2CamasTamañoQueen = "2 camas tamaño queen",
    The3Camas = "3 camas",
}

export enum ListingTitle {
    CondominioEnMiami = "Condominio en Miami",
    DepartamentoEnMiami = "Departamento en Miami",
    DepartamentoEnNorthMiamiBeach = "Departamento en North Miami Beach",
    ResidenciaEnMiami = "Residencia en Miami",
    SuiteConEntradaIndependienteEnMiami = "Suite con entrada independiente en Miami",
}

export enum TitleLocale {
    Es419 = "es-419",
}

export interface PricingQuote {
    __typename:                     PricingQuoteTypename;
    applicableDiscounts:            null;
    barDisplayPriceWithoutDiscount: null;
    canInstantBook:                 boolean;
    displayRateDisplayStrategy:     null;
    monthlyPriceFactor:             null;
    price:                          null;
    priceDropDisclaimer:            null;
    priceString:                    null;
    rate:                           Rate;
    rateType:                       null;
    rateWithoutDiscount:            null;
    rateWithServiceFee:             null;
    secondaryPriceString:           null;
    shouldShowFromLabel:            boolean;
    structuredStayDisplayPrice:     StructuredStayDisplayPrice;
    totalPriceDisclaimer:           null;
    totalPriceWithoutDiscount:      null;
    weeklyPriceFactor:              null;
}

export enum PricingQuoteTypename {
    ExplorePricingQuote = "ExplorePricingQuote",
}

export interface Rate {
    __typename:       RateTypename;
    amount:           number;
    amountFormatted:  null;
    currency:         null;
    isMicrosAccuracy: boolean;
}

export enum RateTypename {
    ExploreCurrencyAmount = "ExploreCurrencyAmount",
}

export interface StructuredStayDisplayPrice {
    __typename:                             StructuredStayDisplayPriceTypename;
    primaryLine:                            StructuredStayDisplayPricePrimaryLine;
    secondaryLine:                          SecondaryLine;
    explanationData:                        ExplanationData;
    explanationDataDisplayPosition:         ExplanationDataDisplayPosition;
    explanationDataDisplayPriceTriggerType: null;
    layout:                                 Layout;
}

export enum StructuredStayDisplayPriceTypename {
    StructuredDisplayPrice = "StructuredDisplayPrice",
}

export interface ExplanationData {
    __typename:   ExplanationDataTypename;
    title:        ExplanationDataTitle;
    priceDetails: PriceDetail[];
}

export enum ExplanationDataTypename {
    DisplayPriceExplanationData = "DisplayPriceExplanationData",
}

export interface PriceDetail {
    __typename:           PriceDetailTypename;
    displayComponentType: PriceDetailDisplayComponentType;
    items?:               PriceDetailItem[];
    renderBorderTop?:     boolean;
    collapsable?:         null;
    content?:             string;
}

export enum PriceDetailTypename {
    DisplayPriceExplanationDisclaimer = "DisplayPriceExplanationDisclaimer",
    DisplayPriceExplanationLineGroup = "DisplayPriceExplanationLineGroup",
}

export enum PriceDetailDisplayComponentType {
    DisplayPriceExplanationDisclaimer = "DISPLAY_PRICE_EXPLANATION_DISCLAIMER",
    DisplayPriceExplanationLineGroup = "DISPLAY_PRICE_EXPLANATION_LINE_GROUP",
}

export interface PriceDetailItem {
    __typename:           PurpleTypename;
    displayComponentType: ItemDisplayComponentType;
    description:          string;
    priceString:          string;
    explanationData:      null;
}

export enum PurpleTypename {
    DefaultExplanationLineItem = "DefaultExplanationLineItem",
    DiscountedExplanationLineItem = "DiscountedExplanationLineItem",
}

export enum ItemDisplayComponentType {
    DefaultExplanationLineItem = "DEFAULT_EXPLANATION_LINE_ITEM",
    DiscountedExplanationLineItem = "DISCOUNTED_EXPLANATION_LINE_ITEM",
}

export enum ExplanationDataTitle {
    DesgloseDelPrecio = "Desglose del precio",
}

export enum ExplanationDataDisplayPosition {
    SecondaryLine = "SECONDARY_LINE",
}

export enum Layout {
    RowWithSeparator = "ROW_WITH_SEPARATOR",
}

export interface StructuredStayDisplayPricePrimaryLine {
    __typename:           FluffyTypename;
    displayComponentType: PrimaryLineDisplayComponentType;
    accessibilityLabel:   string;
    price?:               string;
    qualifier:            Qualifier;
    shortQualifier:       Qualifier;
    concatQualifierLeft:  boolean;
    trailingContent:      null;
    discountedPrice?:     string;
    originalPrice?:       string;
}

export enum FluffyTypename {
    DiscountedDisplayPriceLine = "DiscountedDisplayPriceLine",
    QualifiedDisplayPriceLine = "QualifiedDisplayPriceLine",
}

export enum PrimaryLineDisplayComponentType {
    DiscountedDisplayPriceLine = "DISCOUNTED_DISPLAY_PRICE_LINE",
    QualifiedDisplayPriceLine = "QUALIFIED_DISPLAY_PRICE_LINE",
}

export enum Qualifier {
    Noche = "noche",
}

export interface SecondaryLine {
    __typename:           SecondaryLineTypename;
    displayComponentType: SecondaryLineDisplayComponentType;
    accessibilityLabel:   string;
    price:                string;
    trailingContent:      null;
}

export enum SecondaryLineTypename {
    BasicDisplayPriceLine = "BasicDisplayPriceLine",
}

export enum SecondaryLineDisplayComponentType {
    BasicDisplayPriceLine = "BASIC_DISPLAY_PRICE_LINE",
}

export interface StaysInViewport {
    __typename:    StaysInViewportTypename;
    listingId:     string;
    splitStayUuid: null;
    pinState:      PinState;
}

export enum StaysInViewportTypename {
    ExploreStayMapInfo = "ExploreStayMapInfo",
}

export enum PinState {
    FullPin = "FULL_PIN",
    MiniPin = "MINI_PIN",
}

export interface StaysSearch {
    __typename:           string;
    searchResults:        SearchResult[];
    paginationInfo:       PaginationInfo;
    loggingMetadata:      StaysSearchLoggingMetadata;
    pricingDisclaimer:    null;
    searchInput:          SearchInput;
    filters:              Filters;
    categoryBar:          CategoryBar;
    seo:                  SEO;
    pricingToggle:        PricingToggle;
    sectionConfiguration: SectionConfiguration;
}

export interface CategoryBar {
    __typename:       string;
    allHomesCategory: Category;
    categories:       Category[];
}

export interface Category {
    __typename:   AllHomesCategoryTypename;
    imageUrl:     string;
    title:        string;
    searchParams: AllHomesCategorySearchParams;
}

export enum AllHomesCategoryTypename {
    ExploreCategoryBarItem = "ExploreCategoryBarItem",
}

export interface AllHomesCategorySearchParams {
    __typename:      SearchParamsTypename;
    locationSearch:  null;
    params:          PurpleParam[];
    placeId:         null;
    query:           null;
    refinementPaths: string[];
    resetFilters:    boolean | null;
    resetKeys:       string[];
    tabId:           TabID | null;
}

export enum SearchParamsTypename {
    ExploreSearchParams = "ExploreSearchParams",
}

export interface PurpleParam {
    __typename: ParamTypename;
    inArray:    boolean | null;
    key:        string;
    value:      PurpleValue;
    valueType:  PurpleValueType;
}

export enum ParamTypename {
    ExploreSearchParam = "ExploreSearchParam",
}

export interface PurpleValue {
    __typename:  TentacledTypename;
    stringValue: string;
}

export enum TentacledTypename {
    BoolValue = "BoolValue",
    LongValue = "LongValue",
    StringValue = "StringValue",
}

export enum PurpleValueType {
    Array = "array",
    Integer = "integer",
    String = "string",
}

export enum TabID {
    AllTab = "all_tab",
    HomeTab = "home_tab",
}

export interface Filters {
    __typename:       string;
    allFiltersButton: AllFiltersButton;
    filterPanel:      FilterPanel;
    filterState:      FilterState[];
}

export interface AllFiltersButton {
    __typename:               string;
    count:                    number;
    legacyAllFiltersScreenId: string;
}

export interface FilterPanel {
    __typename:          string;
    clearAllFilterKeys:  string[];
    searchButtonText:    string;
    filterPanelSections: FilterPanelSections;
}

export interface FilterPanelSections {
    __typename: string;
    compact:    string[];
    wide:       string[];
    sections:   FilterPanelSectionsSection[];
}

export interface FilterPanelSectionsSection {
    __typename:  string;
    sectionId:   string;
    loggingData: null;
    sectionData: PurpleSectionData;
}

export interface PurpleSectionData {
    __typename:          string;
    id:                  string;
    filterItemText:      FilterItemTextClass | null;
    discreteFilterItems: DiscreteFilterItem[];
    expandConfiguration: ExpandConfiguration;
}

export interface DiscreteFilterItem {
    __typename:               DiscreteFilterItemTypename;
    text:                     DiscreteFilterItemText | null;
    searchParams?:            ChipSearchParams;
    minValue?:                number;
    maxValue?:                number;
    priceHistogram?:          number[];
    priceFilterInputType?:    number;
    version?:                 string;
    disableAnimation?:        boolean;
    subtitleOnTop?:           boolean;
    roomTypeOptions?:         RoomTypeOption[];
    pills?:                   Pill[];
    columnCountCompact?:      number;
    columnCountWide?:         number;
    style?:                   string;
    chips?:                   Chip[];
    loggingId?:               null | string;
    visibilityConfiguration?: VisibilityConfiguration | null;
}

export enum DiscreteFilterItemTypename {
    ExploreCheckboxFilterItem = "ExploreCheckboxFilterItem",
    ExploreGridFilterItem = "ExploreGridFilterItem",
    ExplorePriceSliderFilterItem = "ExplorePriceSliderFilterItem",
    ExploreRoomTypeFilterItem = "ExploreRoomTypeFilterItem",
    ExploreSingleSelectPillsFilterItem = "ExploreSingleSelectPillsFilterItem",
    ExploreSwitchFilterItem = "ExploreSwitchFilterItem",
    ExploreTitleFilterItem = "ExploreTitleFilterItem",
}

export interface Chip {
    __typename:              string;
    text:                    FilterItemTextClass;
    searchParams:            ChipSearchParams;
    imageUrl:                null | string;
    localImageAsset:         LocalImageAsset | null;
    visibilityConfiguration: Tion | null;
}

export interface LocalImageAsset {
    __typename: string;
    localKey:   string;
    remoteUrl:  null;
}

export interface ChipSearchParams {
    __typename:      SearchParamsTypename;
    locationSearch:  null;
    params:          FluffyParam[];
    placeId:         null;
    query:           null;
    refinementPaths: any[];
    resetFilters:    boolean;
    resetKeys:       any[];
    tabId:           TabID;
}

export interface FluffyParam {
    __typename: ParamTypename;
    inArray:    boolean;
    key:        string;
    value:      FluffyValue | null;
    valueType:  FluffyValueType;
}

export interface FluffyValue {
    __typename:    TentacledTypename;
    booleanValue?: boolean;
    longValue?:    string;
    stringValue?:  string;
}

export enum FluffyValueType {
    Array = "array",
    Boolean = "boolean",
    Integer = "integer",
}

export interface FilterItemTextClass {
    __typename:                FilterItemTextTypename;
    title:                     string;
    subtitle?:                 string;
    countrySpecificSubtitles?: CountrySpecificSubtitle[];
}

export enum FilterItemTextTypename {
    CountrySpecificTitleSubtitleText = "CountrySpecificTitleSubtitleText",
    TitleSubtitleText = "TitleSubtitleText",
    TitleText = "TitleText",
}

export interface CountrySpecificSubtitle {
    __typename:  string;
    countryCode: string[];
    subtitle:    string;
}

export interface Tion {
    __typename:   string;
    searchParams: AllHomesCategorySearchParams;
}

export interface Pill {
    __typename:   PillTypename;
    text:         string;
    searchParams: PillSearchParams;
}

export enum PillTypename {
    ExploreSingleSelectPill = "ExploreSingleSelectPill",
}

export interface PillSearchParams {
    __typename:      SearchParamsTypename;
    locationSearch:  null;
    params:          TentacledParam[];
    placeId:         null;
    query:           null;
    refinementPaths: any[];
    resetFilters:    boolean;
    resetKeys:       Key[];
    tabId:           TabID;
}

export interface TentacledParam {
    __typename: ParamTypename;
    inArray:    boolean;
    key:        Key;
    value:      TentacledValue | null;
    valueType:  PurpleValueType;
}

export enum Key {
    FlexibleDateSearchFilterType = "flexible_date_search_filter_type",
    MinBathrooms = "min_bathrooms",
    MinBedrooms = "min_bedrooms",
    MinBeds = "min_beds",
}

export interface TentacledValue {
    __typename: TentacledTypename;
    longValue:  string;
}

export interface RoomTypeOption {
    __typename:   string;
    title:        FilterItemTextClass;
    nightlyPrice: null;
    searchParams: RoomTypeOptionClearParams;
}

export interface RoomTypeOptionClearParams {
    __typename:      SearchParamsTypename;
    locationSearch:  null;
    params:          StickyParam[] | null;
    placeId:         null;
    query:           null;
    refinementPaths: any[] | null;
    resetFilters:    boolean | null;
    resetKeys:       string[];
    tabId:           TabID | null;
}

export interface StickyParam {
    __typename: ParamTypename;
    inArray:    boolean | null;
    key:        string;
    value:      StickyValue;
    valueType:  PurpleValueType;
}

export interface StickyValue {
    __typename:   TentacledTypename;
    stringValue?: string;
    longValue?:   string;
}

export interface DiscreteFilterItemText {
    __typename:      StickyTypename;
    title:           string;
    subtitle?:       string;
    subtitleText?:   string;
    subtitleAction?: SubtitleAction;
}

export enum StickyTypename {
    TitleSubtitleLink = "TitleSubtitleLink",
    TitleSubtitleText = "TitleSubtitleText",
    TitleText = "TitleText",
}

export interface SubtitleAction {
    __typename:  string;
    loggingData: null;
}

export interface VisibilityConfiguration {
    __typename: string;
    condition:  Tion;
}

export interface ExpandConfiguration {
    __typename:        string;
    collapseText:      null | string;
    expandText:        null | string;
    collapseThreshold: number | null;
}

export interface FilterState {
    __typename: FilterStateTypename;
    isArray:    null;
    key:        string;
    valueType:  FilterStateValueType;
    value:      FilterStateValue | null;
}

export enum FilterStateTypename {
    ExploreFilterState = "ExploreFilterState",
}

export interface FilterStateValue {
    __typename:     IndigoTypename;
    stringValue?:   string;
    stringValues?:  string[];
    dateValue?:     Date;
    integerValue?:  number;
    integerValues?: number[];
    boolValue?:     boolean;
}

export enum IndigoTypename {
    ExploreFilterStateBoolValue = "ExploreFilterStateBoolValue",
    ExploreFilterStateDateValue = "ExploreFilterStateDateValue",
    ExploreFilterStateIntegerValue = "ExploreFilterStateIntegerValue",
    ExploreFilterStateIntegerValues = "ExploreFilterStateIntegerValues",
    ExploreFilterStateStringValue = "ExploreFilterStateStringValue",
    ExploreFilterStateStringValues = "ExploreFilterStateStringValues",
}

export enum FilterStateValueType {
    Boolean = "BOOLEAN",
    Date = "DATE",
    Double = "DOUBLE",
    Integer = "INTEGER",
    IntegerArray = "INTEGER_ARRAY",
    Long = "LONG",
    LongArray = "LONG_ARRAY",
    String = "STRING",
    StringArray = "STRING_ARRAY",
}

export interface StaysSearchLoggingMetadata {
    __typename:             string;
    legacyLoggingSectionId: string;
    remarketingLoggingData: RemarketingLoggingData;
}

export interface RemarketingLoggingData {
    __typename:        string;
    remarketingIds:    any[];
    canonicalLocation: string;
    city:              City;
    state:             string;
    country:           string;
}

export interface PaginationInfo {
    __typename:         string;
    pageCursors:        string[];
    previousPageCursor: null;
    nextPageCursor:     string;
}

export interface PricingToggle {
    __typename: string;
    title:      string;
    switchOn:   boolean;
}

export interface SearchInput {
    __typename:             string;
    staysSearchInput:       StaysSearchInput;
    experiencesSearchInput: ExperiencesSearchInput;
    compactSearchInput:     CompactSearchInput;
    wideSearchInput:        WideSearchInput;
    searchBar:              SearchBar;
}

export interface CompactSearchInput {
    __typename:  string;
    experiences: StaysClass;
    stays:       StaysClass;
}

export interface StaysClass {
    __typename:       string;
    actionButtonText: string;
    clearButtonText:  string;
    refinementPath:   string;
    title:            string;
    whenPanel:        WhenPanel;
    wherePanel:       WherePanel;
    whoPanel:         WhoPanel;
}

export interface WhenPanel {
    __typename:       string;
    actionButtonText: string;
    clearButtonText:  string;
    collapsedTitle:   string;
    expandedTitle:    string;
    skipButtonText:   string;
}

export interface WherePanel {
    __typename:               string;
    collapsedTitle:           string;
    expandedTitle:            string;
    placeholder:              string;
    onlineExperiencesSection: null;
}

export interface WhoPanel {
    __typename:     string;
    collapsedTitle: string;
    expandedTitle:  string;
}

export interface ExperiencesSearchInput {
    __typename:  string;
    clearParams: AllHomesCategorySearchParams;
    dates:       ExperiencesSearchInputDates;
    destination: Destination;
    guests:      ExperiencesSearchInputGuests;
}

export interface ExperiencesSearchInputDates {
    __typename:     string;
    clearParams:    RoomTypeOptionClearParams;
    microFlexItems: null;
    monthlyDial:    MonthlyDial;
    tripDates:      null;
    tripLength:     null;
}

export interface MonthlyDial {
    __typename:          string;
    exploreSearchParams: RoomTypeOptionClearParams | null;
}

export interface Destination {
    __typename:           string;
    autocompleteVertical: string;
    destinationCards:     DestinationCards;
    refinementPath:       string;
    inputText:            string;
    placeholder:          string;
}

export interface DestinationCards {
    __typename: string;
    items:      DestinationCardsItem[];
    text:       string;
}

export interface DestinationCardsItem {
    __typename:          IndecentTypename;
    exploreSearchParams: AllHomesCategorySearchParams;
    imageUrl:            string;
    selected:            null;
    text:                string;
}

export enum IndecentTypename {
    DestinationCardItem = "DestinationCardItem",
}

export interface ExperiencesSearchInputGuests {
    __typename:        string;
    adults:            InfantsClass;
    aggregateTotalMax: AggregateTotalMax;
    children:          InfantsClass;
    infants:           InfantsClass;
    pets:              null;
}

export interface InfantsClass {
    __typename:   string;
    text:         FilterItemTextClass;
    searchParams: AllHomesCategorySearchParams;
    minValue:     number;
    maxValue:     number;
}

export interface AggregateTotalMax {
    __typename:             string;
    filterItemsToAggregate: string[];
    maxValue:               number;
}

export interface SearchBar {
    __typename:         string;
    datesText:          string;
    guestsText:         string;
    locationText:       City;
    microFlexDatesText: null;
}

export interface StaysSearchInput {
    __typename:  string;
    clearParams: RoomTypeOptionClearParams;
    dates:       StaysSearchInputDates;
    destination: Destination;
    guests:      StaysSearchInputGuests;
}

export interface StaysSearchInputDates {
    __typename:     string;
    clearParams:    AllHomesCategorySearchParams;
    microFlexItems: MicroFlexItem[];
    monthlyDial:    MonthlyDial;
    tripDates:      Trip;
    tripLength:     Trip;
}

export interface MicroFlexItem {
    __typename:          string;
    exploreSearchParams: RoomTypeOptionClearParams;
    text:                string;
}

export interface Trip {
    __typename: string;
    items:      TripDatesItem[];
    text:       string;
}

export interface TripDatesItem {
    __typename:          HilariousTypename;
    exploreSearchParams: AllHomesCategorySearchParams;
    subtitle?:           string;
    text:                string;
}

export enum HilariousTypename {
    TripDatesItem = "TripDatesItem",
    TripLengthItem = "TripLengthItem",
}

export interface StaysSearchInputGuests {
    __typename:        string;
    adults:            PurpleAdults;
    aggregateTotalMax: AggregateTotalMax;
    children:          PurpleAdults;
    infants:           InfantsClass;
    pets:              InfantsClass;
}

export interface PurpleAdults {
    __typename:   string;
    text:         FilterItemTextClass;
    searchParams: RoomTypeOptionClearParams;
    minValue:     number;
    maxValue:     number;
}

export interface WideSearchInput {
    __typename:        string;
    experiences:       WideSearchInputExperiences;
    onlineExperiences: OnlineExperiences;
    stays:             Stays;
}

export interface WideSearchInputExperiences {
    __typename:       string;
    datesInput:       ExperiencesDatesInput;
    destinationInput: Input;
    guestsInput:      Input;
}

export interface ExperiencesDatesInput {
    __typename:      string;
    dateLabel:       string;
    datePlaceholder: string;
}

export interface Input {
    __typename:  string;
    label:       string;
    placeholder: string;
}

export interface OnlineExperiences {
    __typename: string;
    badge:      null;
    id:         string;
    label:      string;
    url:        string;
}

export interface Stays {
    __typename:       string;
    datesInput:       StaysDatesInput;
    destinationInput: Input;
    guestsInput:      Input;
}

export interface StaysDatesInput {
    __typename:           string;
    endDateLabel:         string;
    endDatePlaceholder:   string;
    startDateLabel:       string;
    startDatePlaceholder: string;
}

export interface SectionConfiguration {
    __typename:        string;
    alertSections:     null;
    bottomSections:    null;
    mapSection:        MapSection;
    pageTitleSections: PageTitleSections;
    topSections:       null;
    footerSections:    null;
}

export interface MapSection {
    __typename: string;
    compact:    string[];
    wide:       string[];
    sections:   MapSectionSection[];
}

export interface MapSectionSection {
    __typename:  string;
    sectionId:   string;
    loggingData: null;
    sectionData: FluffySectionData;
}

export interface FluffySectionData {
    __typename: string;
    layers:     Layer[];
    metadata:   SectionDataMetadata;
}

export interface Layer {
    __typename:             string;
    sectionLoggingContexts: any[];
}

export interface SectionDataMetadata {
    __typename:             string;
    autoSearchEnabled:      boolean;
    fallbackMapCenter:      Coordinate;
    mapBoundsHint:          MapBoundsHint;
    poiTagsForFlexCategory: any[];
    precision:              string;
    queriedPoi:             null;
    showUserInputLocation:  boolean;
    isMonthlyStaysSearch:   boolean;
    mapMode:                string;
}

export interface MapBoundsHint {
    __typename: string;
    northeast:  Coordinate;
    southwest:  Coordinate;
}

export interface PageTitleSections {
    __typename: string;
    compact:    string[];
    wide:       string[];
    sections:   PageTitleSectionsSection[];
}

export interface PageTitleSectionsSection {
    __typename:  string;
    sectionId:   string;
    loggingData: null;
    sectionData: TentacledSectionData;
}

export interface TentacledSectionData {
    __typename:      string;
    structuredTitle: string;
    subtitle:        null;
    trailingButton:  null;
}

export interface SEO {
    __typename:   string;
    pageMetadata: PageMetadata;
}

export interface StateMutation {
    __typename:  string;
    modals:      any[];
    filterState: FilterState[];
}

export interface Extensions {
    traceId: string;
}
