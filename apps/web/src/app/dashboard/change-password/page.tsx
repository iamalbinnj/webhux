export default function ChangePasswordPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Change Password</h1>
        <p className="mt-2 text-white/45">Keep access to your webhook workspace secure.</p>
      </div>
      <form className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="grid gap-5">
          {[
            ["Current Password", "current-password"],
            ["New Password", "new-password"],
            ["Confirm Password", "confirm-password"],
          ].map(([label, name]) => (
            <label key={name} className="space-y-2">
              <span className="text-sm font-medium">{label}</span>
              <input type="password" name={name} className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 outline-none placeholder:text-white/25 focus:ring-2 focus:ring-white/20" />
            </label>
          ))}
        </div>
        <button type="button" className="mt-6 h-11 rounded-xl bg-white px-5 text-sm font-semibold text-black">Change Password</button>
      </form>
    </div>
  );
}
