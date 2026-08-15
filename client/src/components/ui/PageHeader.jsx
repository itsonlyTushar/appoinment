

const PageHeader = ({ title, description }) => {
    return (
        <div
            className=
            "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
        >
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>
        </div>
    )
}

export default PageHeader