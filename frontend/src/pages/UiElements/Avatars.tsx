import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Avatar from "../../components/ui/avatar/Avatar";
import PageMeta from "../../components/common/PageMeta";

export default function Avatars() {
  return (
    <>
      <PageMeta
        title="React.js Avatars Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Avatars Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Avatars" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Default Avatar">
          {/* Default Avatar (No Status) */}
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Avatar src="/images/user/heysem.jpeg" size="xsmall" />
            <Avatar src="/images/user/heysem.jpeg" size="small" />
            <Avatar src="/images/user/heysem.jpeg" size="medium" />
            <Avatar src="/images/user/heysem.jpeg" size="large" />
            <Avatar src="/images/user/heysem.jpeg" size="xlarge" />
            <Avatar src="/images/user/heysem.jpeg" size="xxlarge" />
          </div>
        </ComponentCard>
        <ComponentCard title="Avatar with online indicator">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Avatar
              src="/images/user/heysem.jpeg"
              size="xsmall"
              status="online"
            />
            <Avatar
              src="/images/user/heysem.jpeg"
              size="small"
              status="online"
            />
            <Avatar
              src="/images/user/heysem.jpeg"
              size="medium"
              status="online"
            />
            <Avatar
              src="/images/user/heysem.jpeg"
              size="large"
              status="online"
            />
            <Avatar
              src="/images/user/heysem.jpeg"
              size="xlarge"
              status="online"
            />
            <Avatar
              src="/images/user/heysem.jpeg"
              size="xxlarge"
              status="online"
            />
          </div>
        </ComponentCard>
        <ComponentCard title="Avatar with Offline indicator">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Avatar
              src="/images/user/heysem.jpeg"
              size="xsmall"
              status="offline"
            />
            <Avatar
              src="/images/user/heysem.jpeg"
              size="small"
              status="offline"
            />
            <Avatar
              src="/images/user/heysem.jpeg"
              size="medium"
              status="offline"
            />
            <Avatar
              src="/images/user/heysem.jpeg"
              size="large"
              status="offline"
            />
            <Avatar
              src="/images/user/heysem.jpeg"
              size="xlarge"
              status="offline"
            />
            <Avatar
              src="/images/user/heysem.jpeg"
              size="xxlarge"
              status="offline"
            />
          </div>
        </ComponentCard>{" "}
        <ComponentCard title="Avatar with busy indicator">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Avatar
              src="/images/user/heysem.jpeg"
              size="xsmall"
              status="busy"
            />
            <Avatar src="/images/user/heysem.jpeg" size="small" status="busy" />
            <Avatar
              src="/images/user/heysem.jpeg"
              size="medium"
              status="busy"
            />
            <Avatar src="/images/user/heysem.jpeg" size="large" status="busy" />
            <Avatar
              src="/images/user/heysem.jpeg"
              size="xlarge"
              status="busy"
            />
            <Avatar
              src="/images/user/heysem.jpeg"
              size="xxlarge"
              status="busy"
            />
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
