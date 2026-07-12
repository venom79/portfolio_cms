const UserDropdown = () => {
  return (
    <button className="flex items-center gap-3 rounded-xl border bg-white px-4 py-2 transition hover:bg-slate-100">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">
        AG
      </div>

      <div className="hidden text-left lg:block">
        <h4 className="font-medium">Aditya Gaonkar</h4>

        <p className="text-sm text-slate-500">Administrator</p>
      </div>
    </button>
  );
};

export default UserDropdown;
