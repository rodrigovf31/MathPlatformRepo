import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  items: { name: string; path: string }[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <Breadcrumb className="mb-6">
    <BreadcrumbList>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <Fragment key={item.path}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.path}>{item.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator />}
          </Fragment>
        );
      })}
    </BreadcrumbList>
  </Breadcrumb>
);

export default Breadcrumbs;
